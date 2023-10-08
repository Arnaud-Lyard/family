import { IsEmail, IsString, Matches, MinLength } from "class-validator";
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
  @MinLength(3, {
    message: "Username must be at least 3 characters long",
  })
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
  @IsString()
  id: string;
  @Field()
  isAdmin: boolean;
}

export interface UserToBeRegistered {
  username: string;
  email: string;
  hashedPassword: string;
}
