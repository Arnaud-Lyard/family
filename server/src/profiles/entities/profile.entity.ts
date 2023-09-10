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
  @Column({ default: false })
  @Field()
  isPlayer: boolean;
  @Column({ default: "" })
  @Field()
  battletag: string;
  @Column()
  userId: number;
  @Field()
  playerId: number;
  @OneToOne(() => User, (user) => user.profile, { onDelete: "CASCADE" })
  @JoinColumn()
  @Field(() => User)
  user: User;

  @OneToOne(() => Player, (player) => player.user)
  @JoinColumn()
  @Field(() => Player)
  player: Player;
}
