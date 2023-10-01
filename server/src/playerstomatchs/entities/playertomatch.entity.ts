import { Field, ObjectType } from "type-graphql";
import { Player } from "../../players/entities/player.entity";
import { Match } from "../../matchs/entities/match.entity";
import { Entity, Enum, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";

export enum League {
  BRONZE = "bronze",
  SILVER = "silver",
  GOLD = "gold",
}

@Entity()
@ObjectType()
export class PlayerToMatch {
  @PrimaryKey({ type: "uuid", defaultRaw: "uuid_generate_v4()" })
  @Field()
  id!: string;

  @Enum(() => League)
  @Field()
  league: League = League.BRONZE;

  @ManyToOne(() => Player, { primary: true })
  player: Player;
  @ManyToOne(() => Match, { primary: true })
  match: Match;

  constructor(league: League = League.BRONZE, player: Player, match: Match) {
    this.league = league;
    this.player = player;
    this.match = match;
  }
}
