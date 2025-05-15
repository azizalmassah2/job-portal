// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const { username, password } = body;

  const user = await prisma.user.findUnique({ where: { username } });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return NextResponse.json({ message: 'بيانات الدخول غير صحيحة' }, { status: 401 });
  }

  return NextResponse.json({
    id: user.id,
    username: user.username,
    email: user.email,
    token: 'token-mock' // يُفضل لاحقًا استخدام JWT حقيقي
  });
}
