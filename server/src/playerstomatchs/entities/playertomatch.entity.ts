import { Field, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Player } from "../../players/entities/player.entity";
import { Match } from "../../matchs/entities/match.entity";

export type League = "bronze" | "silver" | "gold";

@Entity()
@ObjectType()
export class PlayerToMatch {
  @PrimaryColumn({ default: () => "gen_random_uuid()" })
  @Field()
  id: string;

  @Column({ enum: ["bronze", "silver", "gold"], default: "bronze" })
  @Field()
  league: League;
  @Column()
  playerId: string;
  @Column()
  matchId: string;
  @ManyToOne(() => Player, (player) => player.playerToMatchs)
  @JoinColumn()
  player: Player;
  @ManyToOne(() => Match, (match) => match.playerToMatchs)
  @JoinColumn()
  match: Match;
}
