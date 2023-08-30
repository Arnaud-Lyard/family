import { argon2id, hash, verify } from "argon2";
import { IsEmail, Matches, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "../../articles/entities/article.entity";

export type Role = "visitor" | "admin" | "superadmin";

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
  @Column({ enum: ["visitor", "admin", "superadmin"], default: "visitor" })
  role: Role;

  @OneToMany(() => Article, (a) => a.user)
  @Field(() => [Article])
  articles: Article[];
}
export default User;

@ObjectType()
export class UserLoggedIn
  implements
    Omit<User, "id" | "email" | "hashedPassword" | "role" | "articles">
{
  @Field()
  username: string;
}

@ObjectType()
export class UserInformations
  implements Omit<User, "hashedPassword" | "role" | "articles">
{
  @Field()
  id: number;
  @Field()
  username: string;
  @Field()
  email: string;
}
