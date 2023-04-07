import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

async function main() {
  // query goes here
  prisma.$connect().then(async () => {
    console.log(`Connected to the postgres database with prisma`);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
