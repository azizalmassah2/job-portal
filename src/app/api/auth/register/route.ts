import { NextResponse } from "next/server";
import prisma from "../../../../lib/db"; // تأكد من صحة المسار إلى prisma client
import bcrypt from "bcryptjs";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { z, ZodError } from "zod";

// مخطط Zod للتحقق من صحة البيانات الواردة
const UserRegistrationSchema = z.object({
  firstName: z.string().min(2, "الاسم الأول يجب أن يحتوي على حرفين على الأقل"),
  lastName: z.string().min(2, "الاسم الأخير يجب أن يحتوي على حرفين على الأقل"),
  username: z.string().min(4, "اسم المستخدم يجب أن يحتوي على 4 أحرف على الأقل").max(20, "اسم المستخدم يجب ألا يتجاوز 20 حرفًا").regex(/^[a-zA-Z0-9_]+$/, "اسم المستخدم يمكن أن يحتوي فقط على حروف وأرقام وشرطة سفلية"),
  email: z.string().email("صيغة البريد الإلكتروني غير صالحة"),
  password: z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
  countryCode: z.string().min(2, "رمز الدولة مطلوب"), // مثل +966
  phone: z.string().min(7, "رقم الهاتف يجب أن يكون 7 أرقام على الأقل").max(15, "رقم الهاتف يجب ألا يتجاوز 15 رقمًا").regex(/^[0-9]+$/, "رقم الهاتف يجب أن يحتوي على أرقام فقط"),
  dateOfBirth: z.string().refine((date) => !isNaN(new Date(date).getTime()) && new Date(date) < new Date(), {
    message: "تاريخ الميلاد يجب أن يكون تاريخًا صالحًا وفي الماضي",
  }),
  gender: z.string().optional(), // اختياري
  address: z.string().min(5, "العنوان يجب أن يحتوي على 5 أحرف على الأقل"),
  termsAccepted: z.literal("true", { errorMap: () => ({ message: "يجب الموافقة على الشروط والأحكام" }) }),
  // profilePicture هو File، سيتم التحقق منه بشكل منفصل
});

export async function POST(request: Request) {
  let formDataEntries: Record<string, any> = {};
  let profilePictureFile: File | null = null;

  try {
    const reqFormData = await request.formData();
    
    reqFormData.forEach((value, key) => {
      if (key === "profilePicture") {
        if (value instanceof File && value.size > 0) { // تحقق أن الملف فعلي وليس فارغًا
          profilePictureFile = value;
        }
      } else {
        formDataEntries[key] = value;
      }
    });
    
    // 1. التحقق من صحة البيانات باستخدام Zod
    const parsedData = UserRegistrationSchema.parse(formDataEntries);

    // 2. التحقق من وجود المستخدم (البريد الإلكتروني أو اسم المستخدم)
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: parsedData.email },
          { username: parsedData.username },
        ],
      },
    });

    if (existingUser) {
      const errors: Record<string, string> = {};
      if (existingUser.email === parsedData.email) {
        errors.email = "هذا البريد الإلكتروني مستخدم بالفعل";
      }
      if (existingUser.username === parsedData.username) {
        errors.username = "اسم المستخدم هذا موجود مسبقًا";
      }
      return NextResponse.json(
        { message: "البريد الإلكتروني أو اسم المستخدم موجود مسبقًا", errors },
        { status: 409 } // 409 Conflict
      );
    }

    // 3. معالجة صورة الملف الشخصي (إذا تم إرسالها)
    let profilePictureUrlDb: string | undefined = undefined;
    if (profilePictureFile) {
      // التحقق من نوع وحجم الملف من جانب الخادم (إضافة للتحقق من العميل)
      if (!profilePictureFile.type.startsWith("image/")) {
        return NextResponse.json({ message: "ملف الصورة غير صالح، يجب أن يكون صورة.", errors: { profilePicture: "يجب أن يكون الملف صورة" }}, { status: 400 });
      }
      if (profilePictureFile.size > 2 * 1024 * 1024) { // 2MB
         return NextResponse.json({ message: "حجم الصورة كبير جدًا، الحد الأقصى 2MB.", errors: { profilePicture: "الحد الأقصى لحجم الملف 2MB" }}, { status: 400 });
      }

      const buffer = Buffer.from(await profilePictureFile.arrayBuffer());
      const filename = `${Date.now()}-${profilePictureFile.name.replace(/\s+/g, '_')}`; // اسم فريد
      const uploadDir = path.join(process.cwd(), "public/uploads/profile_pictures");
      
      // التأكد من وجود مجلد الرفع
      await mkdir(uploadDir, { recursive: true });
      
      const filePath = path.join(uploadDir, filename);
      await writeFile(filePath, buffer);
      
      profilePictureUrlDb = `/uploads/profile_pictures/${filename}`; // المسار الذي سيُحفظ في قاعدة البيانات
    }

    // 4. تجزئة كلمة المرور
    const hashedPassword = await bcrypt.hash(parsedData.password, 10);

    // 5. إنشاء المستخدم في قاعدة البيانات
    await prisma.user.create({
      data: {
        firstName: parsedData.firstName,
        lastName: parsedData.lastName,
        username: parsedData.username,
        email: parsedData.email,
        password: hashedPassword,
        countryCode: parsedData.countryCode,
        phone: parsedData.phone,
        dateOfBirth: new Date(parsedData.dateOfBirth),
        gender: parsedData.gender,
        address: parsedData.address,
        termsAccepted: true, // تم التحقق منها بواسطة Zod
        profilePicture: profilePictureUrlDb, // إضافة مسار الصورة
      },
    });

    return NextResponse.json(
      { message: "تم التسجيل بنجاح! يمكنك الآن تسجيل الدخول." },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Registration Error:", error);

    if (error instanceof ZodError) {
      const fieldErrors: Record<string, string> = {};
      error.errors.forEach(err => {
        if (err.path.length > 0) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      return NextResponse.json(
        { message: "بيانات الإدخال غير صالحة. يرجى مراجعة الحقول.", errors: fieldErrors },
        { status: 400 }
      );
    }

    // خطأ عام في الخادم
    return NextResponse.json(
      { message: "حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى لاحقًا." },
      { status: 500 }
    );
  }
}
