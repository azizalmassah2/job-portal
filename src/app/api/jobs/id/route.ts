// src/app/api/jobs/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/db";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const jobId = params.id;  // نص

  try {
    const job = await prisma.job.findUnique({
      where: { id: jobId },  // نص كما هو
      include: {
        company: true,
        skills: true,  // لجلب المهارات أيضاً
      },
    });

    if (!job) {
      return NextResponse.json({ error: "الوظيفة غير موجودة" }, { status: 404 });
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error("فشل في جلب تفاصيل الوظيفة:", error);
    return NextResponse.json({ error: "فشل في جلب تفاصيل الوظيفة" }, { status: 500 });
  }
}
