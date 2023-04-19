import { PrismaClient } from "@prisma/client";

// one single instance of PrismaClient is used in the entire application, we import it into the server.ts file make the call to initialize it there
// we also import it into context.ts to use it in the context function, which is attached to every request. Resolvers all are automatically passed the context object and can access the prisma client through it
export const prisma = new PrismaClient();

export async function initializeDatabase() {
  prisma.$connect().then(async () => {
    // eslint-disable-next-line no-console
    console.log(`Connected to the postgres database with prisma`);
  });
}
