import { argon2id, hash, verify } from "argon2";
import { IsEmail, Matches, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export type Role = "visitor" | "admin";

@Entity()
@ObjectType()
class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  username: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  hashedPassword: string;

  @Field()
  @Column({ enum: ["visitor", "admin"], default: "visitor" })
  role: Role;
}
export default User;

@ObjectType()
export class UserLoggedIn
  implements Omit<User, "id" | "email" | "hashedPassword" | "role">
{
  @Field()
  username: string;
}
