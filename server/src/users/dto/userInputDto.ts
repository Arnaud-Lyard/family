import {
  IsEmail,
  IsNumber,
  IsString,
  Matches,
  MinLength,
} from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UserRegisterInputDto {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
  password: string;

  @Field()
  @MinLength(8)
  username: string;
}

@InputType()
export class UserLoginInputDto {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  password: string;
}

@InputType()
export class PromoteUserInputDto {
  @Field()
  @IsNumber()
  id: number;
  @Field()
  isAdmin: boolean;
}

export interface UserToBeRegistered {
  username: string;
  email: string;
  hashedPassword: string;
}
