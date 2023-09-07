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
  @Column({ nullable: true, default: false })
  @Field()
  isPlayer: boolean;
  @Column({ nullable: true, default: "" })
  @Field()
  battletag: string;
  @OneToOne(() => User, (user) => user.profile, { onDelete: "CASCADE" })
  @JoinColumn()
  @Field(() => User)
  user: User;

  @OneToOne(() => Player, (player) => player.user)
  @JoinColumn()
  @Field(() => Player)
  player: Player;
}
