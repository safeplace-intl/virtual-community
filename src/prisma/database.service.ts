import { Profile, User } from "@prisma/client";
import { Service } from "typedi";

// This is the only file where we will ever touch prisma. The service and interfaces hide the underlying implementation of prisma from the rest of the application. This is a good thing because it allows us to swap out prisma for another ORM or database client in the future without having to change any of the code that uses it. This is the power of dependency injection and the repository pattern. When we add more models, we will need to create new repositories for them and add them to the DatabaseClient interface. Other modules will only know of the database client interface and not the underlying implementation. This is the power of abstraction.
import { prisma } from "./index.js";

// If new methods are needed on the repositories, they can be added here and implemented in the repository classes below. The repository classes are the only classes that should ever touch prisma directly.
export interface BaseRepository<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create(createData: any): Promise<T>;
  update(updateOpts: WhereOptions): Promise<T>;
  delete(deleteOpts: DeleteOptions): Promise<T>;
  find(): Promise<T[]>;
  findUnique(findUniqueOpts: FindUniqueWhereOptions): Promise<T>;
}

interface FindUniqueWhereOptions {
  where: {
    id?: number;
    email?: string;
  };
}

interface WhereOptions {
  where: {
    id?: number;
    email?: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

interface DeleteOptions {
  where: {
    id?: number;
    email?: string;
  };
}

export class UserRepository implements BaseRepository<User> {
  private readonly database;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(database: any) {
    this.database = database;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create(createData: any): Promise<User> {
    return this.database.user.create(createData);
  }

  update(updateOpts: WhereOptions): Promise<User> {
    return this.database.user.update(updateOpts);
  }

  delete(deleteOpts: DeleteOptions): Promise<User> {
    return this.database.user.delete(deleteOpts);
  }

  find(): Promise<User[]> {
    return this.database.user.findMany();
  }

  findUnique(findUniqueOpts: FindUniqueWhereOptions): Promise<User> {
    return this.database.user.findUnique(findUniqueOpts);
  }
}

export class ProfileRepository implements BaseRepository<Profile> {
  private readonly database;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(database: any) {
    this.database = database;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create(createData: any): Promise<Profile> {
    return this.database.profile.create(createData);
  }

  update(updateOpts: WhereOptions): Promise<Profile> {
    return this.database.profile.update(updateOpts);
  }

  delete(deleteOpts: DeleteOptions): Promise<Profile> {
    return this.database.profile.delete(deleteOpts);
  }

  find(): Promise<Profile[]> {
    return this.database.profile.findMany();
  }

  findUnique(findUniqueOpts: FindUniqueWhereOptions): Promise<Profile> {
    return this.database.profile.findUnique(findUniqueOpts);
  }
}

export interface DatabaseClient {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getUserRepository(): Promise<UserRepository>;
  getProfileRepository(): Promise<ProfileRepository>;
  getInstance(): DatabaseClient;
  users: UserRepository;
  profiles: ProfileRepository;
}

@Service()
export class DatabaseService implements DatabaseClient {
  users;
  profiles;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private readonly database: any) {
    this.database = database;
    this.users = new UserRepository(this.database);
    this.profiles = new ProfileRepository(this.database);
  }

  async connect(): Promise<void> {
    return this.database.$connect();
  }

  async disconnect(): Promise<void> {
    return this.database.$disconnect();
  }

  async getUserRepository(): Promise<UserRepository> {
    return this.users;
  }

  async getProfileRepository(): Promise<ProfileRepository> {
    return this.profiles;
  }

  getInstance() {
    return this;
  }
}

@Service()
export class PrismaDatabaseService extends DatabaseService {
  constructor() {
    super(prisma);
  }
}

export const prismaDbService = new PrismaDatabaseService();
