/* eslint-disable */
import { GraphQLResolveInfo } from "graphql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthPayload = {
  __typename?: "AuthPayload";
  tokens: TokensPayload;
  user: User;
};

export type CreateUserInput = {
  email: Scalars["String"];
  fullName: Scalars["String"];
  password: Scalars["String"];
  pronouns: Scalars["String"];
};

export type LoginInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createUser: AuthPayload;
  login: AuthPayload;
  refreshToken: TokensPayload;
};

export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};

export type MutationLoginArgs = {
  loginInput: LoginInput;
};

export type MutationRefreshTokenArgs = {
  refreshTokenInput: RefreshTokenInput;
};

export type Query = {
  __typename?: "Query";
  getUser?: Maybe<User>;
};

export type QueryGetUserArgs = {
  userId: Scalars["Float"];
};

export type RefreshTokenInput = {
  refreshToken: Scalars["String"];
  userId: Scalars["Float"];
};

export type TokensPayload = {
  __typename?: "TokensPayload";
  accessToken: Scalars["String"];
  refreshToken: Scalars["String"];
};

export type User = {
  __typename?: "User";
  email: Scalars["String"];
  fullName: Scalars["String"];
  id: Scalars["Int"];
  passwordHash?: Maybe<Scalars["String"]>;
  pronouns: Scalars["String"];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  CreateUserInput: CreateUserInput;
  String: ResolverTypeWrapper<Scalars["String"]>;
  LoginInput: LoginInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  RefreshTokenInput: RefreshTokenInput;
  TokensPayload: ResolverTypeWrapper<TokensPayload>;
  User: ResolverTypeWrapper<User>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthPayload: AuthPayload;
  CreateUserInput: CreateUserInput;
  String: Scalars["String"];
  LoginInput: LoginInput;
  Mutation: {};
  Query: {};
  Float: Scalars["Float"];
  RefreshTokenInput: RefreshTokenInput;
  TokensPayload: TokensPayload;
  User: User;
  Int: Scalars["Int"];
  Boolean: Scalars["Boolean"];
};

export type AuthPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["AuthPayload"] = ResolversParentTypes["AuthPayload"]
> = {
  tokens?: Resolver<ResolversTypes["TokensPayload"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  createUser?: Resolver<
    ResolversTypes["AuthPayload"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateUserArgs, "createUserInput">
  >;
  login?: Resolver<
    ResolversTypes["AuthPayload"],
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, "loginInput">
  >;
  refreshToken?: Resolver<
    ResolversTypes["TokensPayload"],
    ParentType,
    ContextType,
    RequireFields<MutationRefreshTokenArgs, "refreshTokenInput">
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  getUser?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetUserArgs, "userId">
  >;
};

export type TokensPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TokensPayload"] = ResolversParentTypes["TokensPayload"]
> = {
  accessToken?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  fullName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  passwordHash?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  pronouns?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  TokensPayload?: TokensPayloadResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};
