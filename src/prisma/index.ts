import { PrismaClient } from "@prisma/client";

// one single instance of PrismaClient is used in the entire application, we import it into the server.ts file make the call to initialize it there
// We also import it into the database service, which is where we will create the repositories for each model. The repositories are the only classes that will ever touch prisma directly. The database service will be injected into the auth service, which is where we will use the repositories to interact with the database.
export const prisma = new PrismaClient();

export async function initializeDatabase() {
  prisma.$connect().then(async () => {
    // eslint-disable-next-line no-console
    console.log(`Connected to the postgres database with prisma`);
  });
}
export async function disconnectDatabase() {
  await prisma.$disconnect();
}
