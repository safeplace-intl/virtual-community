# Prisma

[Prisma](https://www.prisma.io/) is an open-source database toolkit with three main tools:

1. Prisma Client: Auto-generated and type-safe query builder for Node.js & TypeScript.
2. Prisma Migrate: Declarative data modeling & migration system.
3. Prisma Studio: GUI to view and edit data in your database.

## Commands

`npx prisma migrate dev --name <unique-name-for-migration>` to migrate the `schema.prisma` to the database. It creates a new SQL migration file in `prisma/migrations` and runs the SQL migration against the database.

`npx prisma studio` will open the Prisma Studio built in GUI for viewing and editing the database.

## Seeding the DB

Database seeding happens in two ways with Prisma: manually with `prisma db seed` and automatically in `prisma migrate dev` and `prisma migrate reset`.

Prisma Migrate resets the database and triggers seeding in the following scenarios:

- You manually run the `prisma migrate reset` CLI command.
- The database is reset interactively in the context of using `prisma migrate dev` - for example, as a result of migration history conflicts or database schema drift.
- When you want to use `prisma migrate dev` or `prisma migrate reset` without seeding, you can pass the `--skip-seed` flag.

Here are some [notes on working with a team](https://www.prisma.io/docs/guides/migrate/developing-with-prisma-migrate/team-development) using Prisma migrations. It will be helpful to understand how pushing and pulling changes to the database migrations will work.

## Migrations

`npx prisma migrate dev --name < name-of-migration > --schema=./src/prisma/schema.prisma` will create a new migration for whatever changes have been made to `schema.prisma`
