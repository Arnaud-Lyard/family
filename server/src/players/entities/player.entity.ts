import { Field, ObjectType } from "type-graphql";
import { User } from "../../users/entities/user.entity";
import { Profile } from "../../profiles/entities/profile.entity";
import { PlayerToMatch } from "../../playerstomatchs/entities/playertomatch.entity";
import {
  Collection,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Match } from "../../matchs/entities/match.entity";

@Entity()
@ObjectType()
export class Player {
  @PrimaryKey({ type: "uuid", defaultRaw: "uuid_generate_v4()" })
  @Field()
  id!: string;
  @Property()
  @Field()
  rank: number = 1000;
  @Property()
  @Field()
  rating: number = 1000;
  @Property()
  @Field()
  victory: number = 0;
  @Property()
  @Field()
  defeat: number = 0;
  @OneToOne(() => User, (user) => user.player)
  @Field(() => User)
  user!: User;
  @OneToOne(() => Profile, (profile) => profile.player)
  @Field(() => Profile)
  profile!: Profile;
  @Field(() => [Match])
  @ManyToMany(() => Match, (m) => m.players)
  matchs = new Collection<Match>(this);
  constructor(
    rank: number = 1000,
    rating: number = 1000,
    victory: number = 0,
    defeat: number = 0
  ) {
    this.rank = rank;
    this.rating = rating;
    this.victory = victory;
    this.defeat = defeat;
  }
}
