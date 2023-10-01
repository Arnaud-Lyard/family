import { User } from "../../users/entities/user.entity";
import { Field, ObjectType } from "type-graphql";
import { Player } from "../../players/entities/player.entity";
import { Entity, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
@ObjectType()
export class Profile {
  @PrimaryKey({ type: "uuid", defaultRaw: "uuid_generate_v4()" })
  id!: string;
  @Property()
  @Field()
  isPlayer: boolean = false;
  @Property()
  @Field()
  battletag: string = "";

  @OneToOne(() => User, (user) => user.profile, { owner: true })
  @Field(() => User)
  user!: User;

  @OneToOne(() => Player, (player) => player.profile, { owner: true })
  @Field(() => Player)
  player!: Player;
  constructor(
    isPlayer: boolean = true,
    battletag: string = "",
    user: User,
    player: Player
  ) {
    this.isPlayer = isPlayer;
    this.battletag = battletag;
    this.user = user;
    this.player = player;
  }
}
