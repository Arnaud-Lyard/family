import { Field, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PlayerToMatch } from "../../playerstomatchs/entities/playertomatch.entity";

@Entity()
@ObjectType()
export class Match {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;
  @Column({ type: "timestamptz", name: "planned_date" })
  @Field()
  plannedDate: Date;
  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  @Field()
  createdAt: Date;

  @OneToMany(() => PlayerToMatch, (playerToMatch) => playerToMatch.player)
  playerToMatchs: PlayerToMatch[];
}
