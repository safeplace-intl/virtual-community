import { PrismaClient } from "@prisma/client";

// DO NOT make more new PrismaClient(), use this export if you must, but database should be accessed via database.service
export const prisma = new PrismaClient();

export async function initializeDatabase() {
  prisma.$connect().then(async () => {
    // eslint-disable-next-line no-console
    console.log(`[server] connected to postgres database with prisma`);
  });
}
export async function disconnectDatabase() {
  await prisma.$disconnect();
}
