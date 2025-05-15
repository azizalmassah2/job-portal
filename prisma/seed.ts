// seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // إنشاء المهارات
  const skills = ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'GraphQL'];
  for (const skillName of skills) {
    await prisma.skill.upsert({
      where: { name: skillName },
      update: {},
      create: { name: skillName },
    });
  }

  // إنشاء المستخدمين
  const user1 = await prisma.user.create({
    data: {
      firstName: 'محمد',
      lastName: 'علي',
      username: 'mohammed_ali',
      email: 'mohammed@example.com',
      password: 'password123',
      phone: '966512345678',
      countryCode: '+966',
      dateOfBirth: new Date('1990-05-15'),
      termsAccepted: true,
      gender: 'ذكر',
      address: 'الرياض، السعودية',
      profilePicture: 'https://example.com/profiles/mohammed.jpg',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      firstName: 'فاطمة',
      lastName: 'خالد',
      username: 'fatima_khalid',
      email: 'fatima@example.com',
      password: 'password123',
      phone: '966576543210',
      countryCode: '+966',
      dateOfBirth: new Date('1988-08-20'),
      termsAccepted: true,
      gender: 'أنثى',
      address: 'جدة، السعودية',
      profilePicture: 'https://example.com/profiles/fatima.jpg',
    },
  });

  // إنشاء الشركات للمستخدمين
  const company1 = await prisma.company.create({
    data: {
      name: 'تقنيات المستقبل',
      description: 'شركة رائدة في مجال التكنولوجيا',
      email: 'info@future-tech.com',
      userId: user1.id,
      phone: '966112345678',
      address: 'الرياض، السعودية',
      website: 'https://future-tech.com',
    },
  });

  const company2 = await prisma.company.create({
    data: {
      name: 'تصميم إبداعي',
      description: 'حلول تصميم مبتكرة',
      email: 'contact@creative-design.com',
      userId: user2.id,
      phone: '966198765432',
      address: 'جدة، السعودية',
      website: 'https://creative-design.com',
    },
  });

  // إنشاء الوظائف للشركات
  await prisma.job.create({
    data: {
      title: 'مطور ويب خبير',
      description: 'مطلوب مطور ويب بخبرة في تقنيات حديثة',
      companyId: company1.id,
      salaryMin: 150000,
      salaryMax: 250000,
      location: 'الرياض',
      type: 'دوام كامل',
      experienceLevel: 'خبير',
      skills: {
        connect: [
          { name: 'JavaScript' },
          { name: 'React' },
          { name: 'Node.js' },
        ],
      },
    },
  });

  await prisma.job.create({
    data: {
      title: 'مصمم واجهات مستخدم',
      description: 'مطلوب مصمم واجهات مستخدم مبتكر',
      companyId: company2.id,
      salaryMin: 120000,
      salaryMax: 180000,
      location: 'جدة',
      type: 'دوام جزئي',
      experienceLevel: 'متوسط',
      skills: {
        connect: [
          { name: 'React' },
          { name: 'GraphQL' },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });