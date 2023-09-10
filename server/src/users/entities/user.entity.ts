import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "../../articles/entities/article.entity";
import { Profile } from "../../profiles/entities/profile.entity";
import { Player } from "../../players/entities/player.entity";

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

  @Column({ name: "hashed_password" })
  hashedPassword: string;

  @Field()
  @Column({ enum: ["visitor", "admin", "superadmin"], default: "visitor" })
  role: Role;

  @OneToMany(() => Article, (a) => a.user)
  @Field(() => [Article])
  articles: Article[];

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  @Field(() => Profile)
  profile: Profile;

  @OneToOne(() => Player, (player) => player.user)
  @JoinColumn({ name: "player_id" })
  @Field(() => Player)
  player: Player;
}
export default User;

@ObjectType()
export class UserLoggedIn
  implements
    Omit<
      User,
      | "id"
      | "email"
      | "hashedPassword"
      | "role"
      | "articles"
      | "player"
      | "playerId"
    >
{
  @Field()
  username: string;
  @Field()
  role: Role;
  @Field()
  profile: Profile;
}

@ObjectType()
export class UserInformations
  implements
    Omit<User, "hashedPassword" | "role" | "articles" | "player" | "playerId">
{
  @Field()
  id: number;
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
  id: number;
  @Field()
  username: string;

  @Field()
  role: Role;
}
