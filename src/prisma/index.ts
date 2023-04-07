import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function initializeDatabase() {
  // query goes here
  prisma.$connect().then(async () => {
    console.log(`Connected to the postgres database with prisma`);
  });
}
