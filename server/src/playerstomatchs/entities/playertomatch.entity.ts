import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Player } from "../../players/entities/player.entity";
import { Match } from "../../matchs/entities/match.entity";

export type League = "bronze" | "silver" | "gold";

@Entity()
@ObjectType()
export class PlayerToMatch {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({ enum: ["bronze", "silver", "gold"], default: "bronze" })
  @Field()
  league: League;
  @ManyToOne(() => Player, (player) => player.playerToMatchs)
  @JoinColumn({ name: "player_id" })
  player: Player;
  @ManyToOne(() => Match, (match) => match.playerToMatchs)
  @JoinColumn({ name: "match_id" })
  match: Match;
}
