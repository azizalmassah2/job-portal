import { PrismaClient } from "@prisma/client";

// تأكد من أن `PrismaClient` يتم تهيئته بشكل صحيح
const prisma = new PrismaClient();

export default prisma;
