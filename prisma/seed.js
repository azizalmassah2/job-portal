const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  // تشفير كلمات المرور
  const hashedPassword1 = await bcrypt.hash("aziz123456", 10);
  const hashedPassword2 = await bcrypt.hash("fatima123456", 10);

  // مستخدمون
  const user1 = await prisma.user.create({
    data: {
      firstName: "Aziz",
      lastName: "Almassah",
      username: "aziz123",
      email: "aziz@example.com",
      password: hashedPassword1,
      phone: "777123456",
      countryCode: "+967",
      dateOfBirth: new Date("1995-01-01"),
      gender: "Male",
      address: "Sana'a",
      profilePicture: null,
      termsAccepted: true,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      firstName: "Fatima",
      lastName: "Al-Hamdani",
      username: "fatima88",
      email: "fatima@example.com",
      password: hashedPassword2,
      phone: "777654321",
      countryCode: "+967",
      dateOfBirth: new Date("1990-05-20"),
      gender: "Female",
      address: "Aden",
      profilePicture: null,
      termsAccepted: true,
    },
  });

  // شركات
  const company1 = await prisma.company.create({
    data: {
      name: "TechYemen",
      description: "شركة تقنية متخصصة في تطوير البرمجيات",
      email: "contact@techyemen.com",
      phone: "01-234567",
      address: "Sana'a",
      userId: user1.id,
    },
  });

  const company2 = await prisma.company.create({
    data: {
      name: "Creative Solutions",
      description: "شركة حلول إبداعية في التصميم والتسويق الرقمي",
      email: "info@creative.com",
      phone: "01-987654",
      address: "Aden",
      userId: user2.id,
    },
  });

  // مهارات
  const skillFlutter = await prisma.skill.create({ data: { name: "Flutter" } });
  const skillFirebase = await prisma.skill.create({ data: { name: "Firebase" } });
  const skillReact = await prisma.skill.create({ data: { name: "React" } });
  const skillNode = await prisma.skill.create({ data: { name: "Node.js" } });
  const skillUIUX = await prisma.skill.create({ data: { name: "UI/UX Design" } });

  // وظائف
  const job1 = await prisma.job.create({
    data: {
      title: "Flutter Developer",
      description: "نبحث عن مطور Flutter محترف للانضمام إلى فريقنا.",
      companyId: company1.id,
      salaryMin: 500,
      salaryMax: 1000,
      location: "Sana'a",
      type: "Full-Time",
      experienceLevel: "Intermediate",
      skills: {
        connect: [{ id: skillFlutter.id }, { id: skillFirebase.id }],
      },
    },
  });

  const job2 = await prisma.job.create({
    data: {
      title: "React Frontend Engineer",
      description: "مطلوب مهندس واجهة أمامية باستخدام React بخبرة سنتين على الأقل.",
      companyId: company1.id,
      salaryMin: 600,
      salaryMax: 1200,
      location: "Remote",
      type: "Remote",
      experienceLevel: "Senior",
      skills: {
        connect: [{ id: skillReact.id }],
      },
    },
  });

  const job3 = await prisma.job.create({
    data: {
      title: "Node.js Backend Developer",
      description: "مطور Backend باستخدام Node.js للعمل على مشاريع متعددة.",
      companyId: company2.id,
      salaryMin: 700,
      salaryMax: 1300,
      location: "Aden",
      type: "Full-Time",
      experienceLevel: "Mid-Level",
      skills: {
        connect: [{ id: skillNode.id }],
      },
    },
  });

  const job4 = await prisma.job.create({
    data: {
      title: "UI/UX Designer",
      description: "مصمم واجهات وتجربة مستخدم لإنشاء تصاميم مبتكرة.",
      companyId: company2.id,
      salaryMin: 400,
      salaryMax: 900,
      location: "Sana'a",
      type: "Part-Time",
      experienceLevel: "Junior",
      skills: {
        connect: [{ id: skillUIUX.id }],
      },
    },
  });

  console.log("✅ تم إدخال البيانات بنجاح.");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
