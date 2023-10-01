import { Field, InputType, ObjectType } from "type-graphql";
import { Profile } from "../../profiles/entities/profile.entity";
import { Player } from "../../players/entities/player.entity";
import { Article } from "../../articles/entities/article.entity";
import {
  Collection,
  Entity,
  Enum,
  Filter,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
  Unique,
} from "@mikro-orm/core";
import { IsEmail, Matches, MinLength } from "class-validator";

export enum Role {
  VISITOR = "visitor",
  ADMIN = "admin",
  SUPERADMIN = "superadmin",
}

@Entity()
@ObjectType()
@Unique({ properties: ["username", "email"] })
export class User {
  @Field()
  @PrimaryKey({ type: "uuid", defaultRaw: "uuid_generate_v4()" })
  id!: string;

  @Field()
  @Property({ unique: true })
  username: string;

  @Field()
  @Property({ unique: true })
  email: string;

  @Property()
  hashedPassword: string;

  @Field(() => [String])
  @Enum({ items: () => Role, array: true, default: [Role.VISITOR] })
  roles: Role[] = [Role.VISITOR];

  @OneToMany(() => Article, (article) => article.user)
  articles = new Collection<Article>(this);

  @OneToOne(() => Profile, (profile) => profile.user)
  @Field(() => Profile)
  profile!: Profile;

  @OneToOne(() => Player, (player) => player.user, { owner: true })
  @Field(() => Player)
  player!: Player;

  constructor(
    name: string,
    email: string,
    hashedPassword: string,
    player: Player
  ) {
    this.username = name;
    this.email = email;
    this.hashedPassword = hashedPassword;
    this.player = player;
  }
}

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
@ObjectType()
export class UserLoggedIn
  implements
    Omit<
      User,
      | "id"
      | "email"
      | "hashedPassword"
      | "roles"
      | "articles"
      | "player"
      | "playerId"
    >
{
  @Field()
  username: string;
  @Field(() => [String])
  roles: Role[];
  @Field()
  profile: Profile;
}

@ObjectType()
export class UserInformations
  implements
    Omit<User, "hashedPassword" | "roles" | "articles" | "player" | "playerId">
{
  @Field()
  id: string;
  @Field()
  username: string;
  @Field()
  email: string;
  @Field()
  profile: Profile;
}
@ObjectType()
export class UserAdminList
  implements
    Omit<
      User,
      | "hashedPassword"
      | "email"
      | "articles"
      | "profile"
      | "player"
      | "playerId"
    >
{
  @Field()
  id: string;
  @Field()
  username: string;

  @Field(() => [String])
  roles: Role[];
}

@ObjectType()
export class UserRegistered
  implements
    Omit<
      User,
      "hashedPassword" | "roles" | "id" | "articles" | "profile" | "player"
    >
{
  @Field()
  username: string;
  @Field()
  email: string;
}
