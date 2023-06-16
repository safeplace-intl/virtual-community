import { Comment, Post, Profile, User } from "@prisma/client";
import { Service } from "typedi";

// This is the only file where we will ever touch prisma. The service and interfaces hide the underlying implementation of prisma from the rest of the application. This is a good thing because it allows us to swap out prisma for another ORM or database client in the future without having to change any of the code that uses it. This is the power of dependency injection and the repository pattern. When we add more models, we will need to create new repositories for them and add them to the DatabaseClient interface. Other modules will only know of the database client interface and not the underlying implementation. This is the power of abstraction.
import { prisma } from "./index.js";

// If new methods are needed on the repositories, they can be added here and implemented in the repository classes below. The repository classes are the only classes that should ever touch prisma directly.
export interface BaseRepository<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create(createData: any): Promise<T>;
  update(updateOpts: WhereOptions): Promise<T>;
  delete(deleteOpts: DeleteOptions): Promise<T>;
  find(findOpts: WhereOptions): Promise<T[]>;
  findUnique(findUniqueOpts: FindUniqueWhereOptions): Promise<T | null>;
}

interface FindUniqueWhereOptions {
  where: {
    id?: number;
    email?: string;
    userId?: number;
    postId?: number;
    commentId?: number;
  };
}

interface WhereOptions {
  where: {
    id?: number;
    email?: string;
    userId?: number;
    postId?: number;
    commentId?: number;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
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
  async create(createData: any): Promise<User> {
    return await this.database.user.create(createData);
  }

  async update(updateOpts: WhereOptions): Promise<User> {
    return await this.database.user.update(updateOpts);
  }

  async delete(deleteOpts: DeleteOptions): Promise<User> {
    return await this.database.user.delete(deleteOpts);
  }

  async find(): Promise<User[]> {
    return await this.database.user.findMany();
  }

  async findUnique(
    findUniqueOpts: FindUniqueWhereOptions
  ): Promise<User | null> {
    return await this.database.user.findUnique(findUniqueOpts);
  }
}

export class ProfileRepository implements BaseRepository<Profile> {
  private readonly database;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(database: any) {
    this.database = database;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(createData: any): Promise<Profile> {
    return await this.database.profile.create(createData);
  }

  async update(updateOpts: WhereOptions): Promise<Profile> {
    return await this.database.profile.update(updateOpts);
  }

  async delete(deleteOpts: DeleteOptions): Promise<Profile> {
    return await this.database.profile.delete(deleteOpts);
  }

  async find(): Promise<Profile[]> {
    return await this.database.profile.findMany();
  }

  async findUnique(
    findUniqueOpts: FindUniqueWhereOptions
  ): Promise<Profile | null> {
    return await this.database.profile.findUnique(findUniqueOpts);
  }
}

export class PostRepository implements BaseRepository<Post> {
  private readonly database;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(database: any) {
    this.database = database;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(createData: any): Promise<Post> {
    return await this.database.post.create(createData);
  }

  async update(updateOpts: WhereOptions): Promise<Post> {
    return await this.database.post.update(updateOpts);
  }

  async delete(deleteOpts: DeleteOptions): Promise<Post> {
    return await this.database.post.delete(deleteOpts);
  }

  async find(findOpts: WhereOptions): Promise<Post[]> {
    return await this.database.post.findMany(findOpts);
  }

  async findUnique(
    findUniqueOpts: FindUniqueWhereOptions
  ): Promise<Post | null> {
    return await this.database.post.findUnique(findUniqueOpts);
  }
}

export class CommentRepository implements BaseRepository<Comment> {
  private readonly database;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(database: any) {
    this.database = database;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(createData: any): Promise<Comment> {
    return await this.database.comment.create(createData);
  }

  async update(updateOpts: WhereOptions): Promise<Comment> {
    return await this.database.comment.update(updateOpts);
  }

  async delete(deleteOpts: DeleteOptions): Promise<Comment> {
    return await this.database.comment.delete(deleteOpts);
  }

  async find(findOpts: WhereOptions): Promise<Comment[]> {
    return await this.database.comment.findMany(findOpts);
  }

  async findUnique(
    findUniqueOpts: FindUniqueWhereOptions
  ): Promise<Comment | null> {
    return await this.database.comment.findUnique(findUniqueOpts);
  }
}

export interface DatabaseClient {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getInstance(): DatabaseClient;
  users: UserRepository;
  profiles: ProfileRepository;
  posts: PostRepository;
  comments: CommentRepository;
}

@Service()
export class DatabaseService implements DatabaseClient {
  users;
  profiles;
  posts;
  comments;
  protected database;

  constructor() {
    this.database = prisma;
    this.users = new UserRepository(this.database);
    this.profiles = new ProfileRepository(this.database);
    this.posts = new PostRepository(this.database);
    this.comments = new CommentRepository(this.database);
  }

  async connect(): Promise<void> {
    return this.database.$connect();
  }

  async disconnect(): Promise<void> {
    return this.database.$disconnect();
  }

  getInstance() {
    return this;
  }
}

@Service()
export class PrismaDatabaseService extends DatabaseService {
  constructor() {
    super();
  }
}

export const prismaDbService = new PrismaDatabaseService();
