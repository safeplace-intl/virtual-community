// import { prisma } from "./index.js";

// async function main() {
//   const alex = await prisma.user.upsert({
//     where: { email: "alex@email.com" },
//     update: {},
//     create: {
//       email: "alex@email.com",
//       passwordHash: "123",
//       isActive: true,
//     },
//   });
//   const blake = await prisma.user.upsert({
//     where: { email: "blake@email.com" },
//     update: {},
//     create: {
//       email: "blake@email.com",
//       passwordHash: "123",
//       isActive: true,
//     },
//   });
//   const sam = await prisma.user.upsert({
//     where: { email: "sam@email.com" },
//     update: {},
//     create: {
//       email: "sam@email.com",
//       passwordHash: "123",
//       isActive: true,
//     },
//   });

//   // eslint-disable-next-line no-console
//   console.log({ alex, blake, sam });
// }
// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     // eslint-disable-next-line no-console
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
