import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "../../users/entities/user.entity";
import { Field, ObjectType } from "type-graphql";
import { Player } from "../../players/entities/player.entity";

@Entity()
@ObjectType()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ default: false, name: "is_player" })
  @Field()
  isPlayer: boolean;
  @Column({ default: "" })
  @Field()
  battletag: string;

  @OneToOne(() => User, (user) => user.profile, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  @Field(() => User)
  user: User;

  @OneToOne(() => Player, (player) => player.user)
  @JoinColumn({ name: "player_id" })
  @Field(() => Player)
  player: Player;
}
