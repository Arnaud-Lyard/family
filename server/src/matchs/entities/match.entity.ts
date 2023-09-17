import { Field, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { PlayerToMatch } from "../../playerstomatchs/entities/playertomatch.entity";

export type Status = "waiting" | "progress" | "done";

@Entity()
@ObjectType()
export class Match {
  @PrimaryColumn({ default: () => "gen_random_uuid()" })
  @Field()
  id: string;
  @Column({ enum: ["waiting", "progress", "done"], default: "waiting" })
  status: Status;
  @Field()
  @Column({ type: "timestamp" })
  @Field()
  plannedDate: Date;
  @CreateDateColumn({ type: "timestamptz" })
  @Field()
  createdAt: Date;

  @OneToMany(() => PlayerToMatch, (playerToMatch) => playerToMatch.player)
  playerToMatchs: PlayerToMatch[];
}
