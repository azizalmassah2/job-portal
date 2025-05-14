"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { arabicCountries, Country } from "../../data/countries"; // تأكد من صحة المسار

// واجهة لتعريف نوع بيانات النموذج
interface FormDataState {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  countryCode: string; // سيخزن رمز الهاتف الدولي مثل +966
  phone: string; // سيخزن رقم الهاتف بدون رمز الدولة
  dateOfBirth: string;
  gender: string;
  address: string;
  profilePicture: File | null;
  termsAccepted: boolean;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormDataState>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    countryCode: arabicCountries.find(c => c.code === "SA")?.phoneCode || "+966", // قيمة افتراضية
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    profilePicture: null,
    termsAccepted: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null); // لرسائل الخطأ العامة من الـ API
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [registrationSuccess, setRegistrationSuccess] = useState<string | null>(null);


  const validateField = (name: string, value: string | File | boolean | null): boolean => {
    let error = "";
    
    switch (name) {
      case "firstName":
      case "lastName":
        if (!value) error = "هذا الحقل مطلوب";
        else if ((value as string).length < 2) error = "يجب أن يحتوي على الأقل على حرفين";
        break;
      case "username":
        if (!value) error = "اسم المستخدم مطلوب";
        else if (!/^[a-zA-Z0-9_]{4,20}$/.test(value as string)) 
          error = "يجب أن يحتوي على 4-20 حرف (أرقام، حروف، _)";
        break;
      case "email":
        if (!value) error = "البريد الإلكتروني مطلوب";
        else if (!/\S+@\S+\.\S+/.test(value as string)) 
          error = "بريد إلكتروني غير صالح";
        break;
      case "password":
        const strength = calculatePasswordStrength(value as string);
        setPasswordStrength(strength);
        if (!value) error = "كلمة المرور مطلوبة";
        else if ((value as string).length < 8) 
          error = "يجب أن تكون 8 أحرف على الأقل";
        // يمكنك إضافة المزيد من قواعد قوة كلمة المرور هنا إذا أردت
        break;
      case "confirmPassword":
        if (!value) error = "تأكيد كلمة المرور مطلوب";
        else if (value !== formData.password) 
          error = "كلمات المرور غير متطابقة";
        break;
      case "phone":
        if (!value) error = "رقم الهاتف مطلوب";
        else if (!/^[0-9]{7,15}$/.test(value as string)) // تم تعديل النمط ليتناسب مع أرقام الهواتف المحلية
          error = "رقم هاتف غير صالح (7-15 أرقام)";
        break;
      case "dateOfBirth":
        if (!value) error = "تاريخ الميلاد مطلوب";
        else if (new Date(value as string) >= new Date()) 
          error = "تاريخ الميلاد يجب أن يكون في الماضي";
        break;
      case "address":
        if (!value) error = "العنوان مطلوب";
        else if ((value as string).length < 5) error = "العنوان قصير جدًا";
        break;
      case "termsAccepted":
        if (!value) error = "يجب الموافقة على الشروط والأحكام";
        break;
      case "profilePicture":
        if (value) {
          const file = value as File;
          if (!file.type.startsWith("image/")) 
            error = "يجب أن يكون الملف صورة";
          else if (file.size > 2 * 1024 * 1024) // 2MB
            error = "الحد الأقصى لحجم الملف 2MB";
        }
        break;
    }

    setErrors(prev => ({ ...prev, [name]: error }));
    return !error; // ترجع 'true' إذا كان الحقل صالحًا
  };

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (!password) return 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++; // رموز خاصة
    return strength;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    const newValue = type === "checkbox" 
      ? (e.target as HTMLInputElement).checked 
      : value;

    setFormData(prev => ({ ...prev, [name]: newValue }));
    
    // التحقق الفوري عند التغيير (باستثناء حقل الملف الذي له معالج منفصل)
    if (name !== "profilePicture") {
      validateField(name, newValue);
    }
    // إزالة رسالة الخطأ العامة عند بدء المستخدم في التعديل
    if (formError) setFormError(null);
    if (registrationSuccess) setRegistrationSuccess(null);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFormData(prev => ({ ...prev, profilePicture: file }));
    validateField("profilePicture", file); // التحقق من الملف عند اختياره
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null); // إعادة تعيين أي خطأ سابق في النموذج
    setRegistrationSuccess(null);

    // التحقق من جميع الحقول قبل الإرسال
    let allFieldsValid = true;
    Object.entries(formData).forEach(([name, value]) => {
      // تأكد من أن profilePicture يتم التحقق منه حتى لو كان null (إذا كان مطلوباً)
      // في حالتنا، هو اختياري، لذا التحقق يتم فقط إذا كان هناك ملف
      if (name === "profilePicture" && value === null) {
        // لا تقم بالتحقق إذا كان الملف اختياريًا ولم يتم تحديده
        // إذا كان إجباريًا، يجب تعديل هذا المنطق
         setErrors(prev => ({ ...prev, profilePicture: "" })); // مسح أي خطأ سابق إذا كان الملف اختياريًا
      } else {
         if (!validateField(name, value)) {
            allFieldsValid = false;
         }
      }
    });


    // التحقق مرة أخرى من أي أخطاء متبقية في الحالة
    const hasErrors = Object.values(errors).some(error => error !== "");
    if (!allFieldsValid || hasErrors) {
      setIsSubmitting(false);
      setFormError("يرجى تصحيح الأخطاء في النموذج.");
      return;
    }

    const dataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "profilePicture" && value instanceof File) {
        dataToSubmit.append(key, value);
      } else if (value !== null && value !== undefined && typeof value !== 'object') { // تجنب إضافة كائنات فارغة
        dataToSubmit.append(key, String(value));
      }
    });
    
    // إضافة التاريخ الحالي كمعرف لمنع التخزين المؤقت إذا لزم الأمر
    // dataToSubmit.append('_t', Date.now().toString());


    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        body: dataToSubmit,
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) { // إذا أرسل الخادم أخطاء محددة للحقول
          setErrors(prev => ({ ...prev, ...result.errors }));
          setFormError(result.message || "حدث خطأ في الخادم، يرجى مراجعة الحقول.");
        } else {
          setFormError(result.message || `خطأ ${response.status}: حدث خطأ ما.`);
        }
      } else {
        setRegistrationSuccess(result.message || "تم التسجيل بنجاح!");
        // يمكنك هنا إعادة تعيين النموذج أو إعادة توجيه المستخدم
        setFormData({ // إعادة تعيين النموذج كمثال
            firstName: "", lastName: "", username: "", email: "",
            password: "", confirmPassword: "",
            countryCode: arabicCountries.find(c => c.code === "SA")?.phoneCode || "+966",
            phone: "", dateOfBirth: "", gender: "", address: "",
            profilePicture: null, termsAccepted: false,
        });
        setErrors({});
        setPasswordStrength(0);
        // window.location.href = '/login'; // مثال لإعادة التوجيه
      }
    } catch (apiError: any) {
      console.error("API request failed:", apiError);
      setFormError(apiError.message || 'فشل الاتصال بالخادم. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // إعادة التحقق من تأكيد كلمة المرور عند تغيير كلمة المرور أو تأكيدها
  useEffect(() => {
    if (formData.password || formData.confirmPassword) {
        validateField("confirmPassword", formData.confirmPassword);
    }
  }, [formData.password, formData.confirmPassword]);

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        إنشاء حساب جديد
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg" noValidate>
        {formError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">خطأ! </strong>
            <span className="block sm:inline">{formError}</span>
          </div>
        )}
        {registrationSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">نجاح! </strong>
            <span className="block sm:inline">{registrationSuccess}</span>
          </div>
        )}

        <fieldset className="space-y-4 border p-4 rounded">
          <legend className="text-lg font-semibold px-2 text-gray-700">المعلومات الشخصية</legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block mb-1 font-medium text-gray-700">الاسم الأول*</label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <label htmlFor="lastName" className="block mb-1 font-medium text-gray-700">الاسم الأخير*</label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="username" className="block mb-1 font-medium text-gray-700">اسم المستخدم*</label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${errors.username ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
            </div>

            <div>
              <label htmlFor="gender" className="block mb-1 font-medium text-gray-700">الجنس</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${errors.gender ? "border-red-500" : "border-gray-300"}`}
              >
                <option value="">اختر...</option>
                <option value="male">ذكر</option>
                <option value="female">أنثى</option>
                <option value="other">آخر</option>
              </select>
              {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="dateOfBirth" className="block mb-1 font-medium text-gray-700">تاريخ الميلاد*</label>
            <input
              id="dateOfBirth"
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${errors.dateOfBirth ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
          </div>
        </fieldset>

        <fieldset className="space-y-4 border p-4 rounded">
          <legend className="text-lg font-semibold px-2 text-gray-700">معلومات الاتصال</legend>

          <div>
              <label htmlFor="email" className="block mb-1 font-medium text-gray-700">البريد الإلكتروني*</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <label htmlFor="phone" className="block mb-1 font-medium text-gray-700">رقم الهاتف*</label>
            <div className="flex gap-2">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="border px-3 py-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 w-auto"
              >
                {arabicCountries.map((country: Country) => (
                  <option key={country.code} value={country.phoneCode}>
                    {country.name} ({country.phoneCode})
                  </option>
                ))}
              </select>
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="مثال: 501234567"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${errors.phone ? "border-red-500" : "border-gray-300"}`}
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            {errors.countryCode && <p className="text-red-500 text-sm mt-1">{errors.countryCode}</p>}
          </div>

          <div>
            <label htmlFor="address" className="block mb-1 font-medium text-gray-700">العنوان*</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${errors.address ? "border-red-500" : "border-gray-300"}`}
              rows={3}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>
        </fieldset>

        <fieldset className="space-y-4 border p-4 rounded">
          <legend className="text-lg font-semibold px-2 text-gray-700">الأمان</legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="password" className="block mb-1 font-medium text-gray-700">كلمة المرور*</label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${errors.password ? "border-red-500" : "border-gray-300"}`}
              />
              <div className="mt-2">
                <span className="text-sm text-gray-600">قوة كلمة المرور:</span>
                <div className="flex gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 w-1/5 rounded ${i < passwordStrength ? "bg-green-500" : "bg-gray-200"}`}
                    />
                  ))}
                </div>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block mb-1 font-medium text-gray-700">تأكيد كلمة المرور*</label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="profilePicture" className="block mb-1 font-medium text-gray-700">صورة الملف الشخصي (اختياري)</label>
            <input
              id="profilePicture"
              type="file"
              name="profilePicture"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {errors.profilePicture && <p className="text-red-500 text-sm mt-1">{errors.profilePicture}</p>}
          </div>
        </fieldset>

        <div className="flex items-start gap-2">
          <input
            id="termsAccepted"
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
            className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <div>
            <label htmlFor="termsAccepted" className="text-sm text-gray-700">
              أوافق على <a href="/terms" target="_blank" className="text-blue-600 hover:underline">الشروط والأحكام</a>*
            </label>
            {errors.termsAccepted && <p className="text-red-500 text-sm">{errors.termsAccepted}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              جاري التسجيل...
            </>
          ) : 'تسجيل حساب جديد'}
        </button>
      </form>
    </div>
  );
}