import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
} from "class-validator";
import { Field, InputType } from "type-graphql";

import { StringScalar } from "../../utils/scalars/string-sanitizer.util.js";
import { defaultPasswordOpts } from "./auth.dto.js";

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @IsStrongPassword(defaultPasswordOpts)
  password!: string;

  @Field(() => StringScalar)
  @IsNotEmpty()
  @MaxLength(100)
  fullName!: string;

  @Field({ nullable: true })
  @MaxLength(15)
  pronouns?: string;
}
