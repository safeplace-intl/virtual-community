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

//   const profileAlex = await prisma.profile.upsert({
//     where: { userId: alex.id },
//     update: {},
//     create: {
//       userId: alex.id,
//       fullName: "Alex",
//       pronouns: "he/him",
//       tdaGradYear: 2023,
//       currentLocation: "New York, NY",
//       bio: "I'm a cool guy",
//     },
//   });
//   const profileBlake = await prisma.profile.upsert({
//     where: { userId: blake.id },
//     update: {},
//     create: {
//       userId: blake.id,
//       fullName: "Blake",
//       pronouns: "she/her",
//       tdaGradYear: 2023,
//       currentLocation: "Los Angeles, CA",
//       bio: "I'm a cool gal",
//     },
//   });

//   const profileSam = await prisma.profile.upsert({
//     where: { userId: sam.id },
//     update: {},
//     create: {
//       userId: sam.id,
//       fullName: "Sam",
//       pronouns: "they/them",
//       tdaGradYear: 2023,
//       currentLocation: "Washington D.C.",
//       bio: "I'm a cool person",
//     },
//   });

//   // eslint-disable-next-line no-console
//   console.log({ alex, blake, sam });
//   // eslint-disable-next-line no-console
//   console.log({ profileAlex, profileBlake, profileSam });
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
