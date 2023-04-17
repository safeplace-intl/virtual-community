import { prisma } from "./index.js";

async function main() {
  const alex = await prisma.user.upsert({
    where: { email: "alex@email.com" },
    update: {},
    create: {
      email: "alex@email.com",
      fullName: "Alex",
      pronouns: "she/her",
      passwordHash: "123",
    },
  });
  const blake = await prisma.user.upsert({
    where: { email: "blake@email.com" },
    update: {},
    create: {
      email: "blake@email.com",
      fullName: "Bob",
      pronouns: "he/him",
      passwordHash: "123",
    },
  });
  const sam = await prisma.user.upsert({
    where: { email: "sam@email.com" },
    update: {},
    create: {
      email: "sam@email.com",
      fullName: "Sam",
      pronouns: "they/them",
      passwordHash: "123",
    },
  });
  // eslint-disable-next-line no-console
  console.log({ alex, blake, sam });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
