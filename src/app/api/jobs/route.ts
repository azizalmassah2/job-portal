import { NextResponse } from "next/server";
import prisma  from "../../../lib/db";

export async function GET() {
  try {
    // جلب جميع الوظائف من قاعدة البيانات
    const jobs = await prisma.job.findMany();
    return NextResponse.json(jobs);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "فشل في جلب الوظائف" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, company } = body;

    // التحقق من أن البيانات موجودة
    if (!title || !description || !company) {
      return NextResponse.json({ error: "جميع الحقول مطلوبة" }, { status: 400 });
    }

    // إضافة الوظيفة الجديدة إلى قاعدة البيانات
    const newJob = await prisma.job.create({
      data: { title, description, company },
    });

    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "فشل في إضافة الوظيفة" }, { status: 500 });
  }
}
