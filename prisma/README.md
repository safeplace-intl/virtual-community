# Prisma

[Prisma](https://www.prisma.io/) is an open-source database toolkit with three main tools:

1. Prisma Client: Auto-generated and type-safe query builder for Node.js & TypeScript.
2. Prisma Migrate: Declarative data modeling & migration system.
3. Prisma Studio: GUI to view and edit data in your database.

## Commands

`npx prisma migrate dev --name <unique-name-for-migration>` to migrate the `schema.prisma` to the database. It creates a new SQL migration file in `prisma/migrations` and runs the SQL migration against the database.

`npx prisma studio` will open  the Prisma Studio built in GUI for viewing and editing the database.
