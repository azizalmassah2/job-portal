import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. إنشاء مستخدم
  const user = await prisma.user.create({
    data: {
      firstName: 'عزيز',
      lastName: 'المساح',
      username: 'aziz2025',
      email: "aziz+" + Date.now() + "@example.com",
      password: 'hashed_password_123', // تأكد من التشفير في التطبيق الفعلي
      phone: '777123456',
      countryCode: '+967',
      dateOfBirth: new Date('1990-01-01'),
      gender: 'male',
      termsAccepted: true,
    },
  });

  console.log('تم إنشاء المستخدم:', user.id);

  // 2. إنشاء شركة تابعة للمستخدم
  const company = await prisma.company.create({
    data: {
      name: 'ألفا سوفت',
      description: 'شركة تقنية متخصصة في تطوير الأنظمة',
      email: 'info@alphasoft.com',
      phone: '01-234567',
      address: 'شارع الزبيري - صنعاء',
      userId: user.id,
    },
  });

  console.log('تم إنشاء الشركة:', company.id);

  // 3. إنشاء مهارات مرتبطة بالوظيفة
  const skill1 = await prisma.skill.upsert({
    where: { name: 'JavaScript' },
    update: {},
    create: { name: 'JavaScript' },
  });

  const skill2 = await prisma.skill.upsert({
    where: { name: 'React' },
    update: {},
    create: { name: 'React' },
  });

  // 4. إنشاء وظيفة
  const job = await prisma.job.create({
    data: {
      title: 'مطور واجهات أمامية',
      description: 'نبحث عن مطور React لديه خبرة جيدة في JavaScript وواجهات المستخدم.',
      salaryMin: 800,
      salaryMax: 1500,
      location: 'الرياض - عن بُعد',
      type: 'REMOTE',
      experienceLevel: 'MID',
      status: 'ACTIVE',
      companyId: company.id,
      skills: {
        connect: [
          { id: skill1.id },
          { id: skill2.id },
        ],
      },
    },
  });

  console.log('تم إنشاء الوظيفة:', job.id);
}

main()
  .then(() => {
    console.log('✅ تم تنفيذ السكربت بنجاح');
    prisma.$disconnect();
  })
  .catch((error) => {
    console.error('❌ حدث خطأ:', error);
    prisma.$disconnect();
    process.exit(1);
  });
