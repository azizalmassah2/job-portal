// src/app/api/jobs/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/db";
import { z } from "zod";

// تعريف مخطط البيانات باستخدام Zod
const jobSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(50).max(2000),
  companyId: z.string().uuid(),
  salaryRange: z.tuple([z.number(), z.number()]),
  location: z.string(),
  type: z.enum(["FULL_TIME", "PART_TIME", "REMOTE"]),
  skills: z.array(z.string()).optional(),
  experienceLevel: z.enum(["JUNIOR", "MID", "SENIOR"]).optional(),
});

// Middleware للتحقق من الصلاحيات
const isAuthenticated = async (req: NextRequest) => {
  const session = req.cookies.get("session");
  // إضافة منطق التحقق الفعلي هنا
  return true; // مؤقت للاختبار
};

/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: الحصول على قائمة الوظائف النشطة
 *     responses:
 *       200:
 *         description: قائمة الوظائف
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 */
export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      where: { status: "ACTIVE" },
      include: { company: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("فشل في جلب الوظائف:", error);
    return NextResponse.json(
      { error: "فشل في جلب الوظائف" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/jobs:
 *   post:
 *     summary: إضافة وظيفة جديدة
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       201:
 *         description: تم إنشاء الوظيفة بنجاح
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 */
export async function POST(req: NextRequest) {
  try {
    // التحقق من الصلاحيات
    if (!(await isAuthenticated(req))) {
      return NextResponse.json(
        { error: "غير مصرح بالوصول" },
        { status: 401 }
      );
    }

    // التحقق من نوع المحتوى
    const contentType = req.headers.get("content-type");
    if (contentType !== "application/json") {
      return NextResponse.json(
        { error: "نوع المحتوى غير مدعوم" },
        { status: 415 }
      );
    }

    // التحقق من حجم البيانات
    const contentLength = Number(req.headers.get("content-length"));
    if (contentLength > 10000) {
      return NextResponse.json(
        { error: "حجم البيانات أكبر من المسموح" },
        { status: 413 }
      );
    }

    // التحقق من البيانات
    const body = await req.json();
    const validation = jobSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: "بيانات غير صالحة", details: validation.error },
        { status: 400 }
      );
    }

    // التحقق من وجود الشركة
    const company = await prisma.company.findUnique({
      where: { id: body.companyId },
    });

    if (!company) {
      return NextResponse.json(
        { error: "الشركة غير موجودة" },
        { status: 404 }
      );
    }

    // إنشاء الوظيفة
    const newJob = await prisma.job.create({
      data: {
        title: body.title,
        description: body.description,
        companyId: body.companyId,
        salaryMin: body.salaryRange[0],
        salaryMax: body.salaryRange[1],
        location: body.location,
        type: body.type,
        skills: body.skills,
        experienceLevel: body.experienceLevel,
        status: "ACTIVE",
      },
    });

    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    console.error("فشل في إضافة الوظيفة:", error);
    return NextResponse.json(
      { error: "فشل في إضافة الوظيفة" },
      { status: 500 }
    );
  }
}

// تعريفات Swagger
/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - companyId
 *         - salaryRange
 *         - location
 *         - type
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         companyId:
 *           type: string
 *         salaryRange:
 *           type: array
 *           items:
 *             type: number
 *         location:
 *           type: string
 *         type:
 *           type: string
 *           enum: [FULL_TIME, PART_TIME, REMOTE]
 *         skills:
 *           type: array
 *           items:
 *             type: string
 *         experienceLevel:
 *           type: string
 *           enum: [JUNIOR, MID, SENIOR]
 *         status:
 *           type: string
 *           enum: [ACTIVE, INACTIVE]
 */
