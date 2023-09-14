import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import User from "../../users/entities/user.entity";
import { Field, ObjectType } from "type-graphql";
import { Player } from "../../players/entities/player.entity";

@Entity()
@ObjectType()
export class Profile {
  @PrimaryColumn({ default: () => "gen_random_uuid()" })
  id: string;
  @Column({ default: false })
  @Field()
  isPlayer: boolean;
  @Column({ default: "" })
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
