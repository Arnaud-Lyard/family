import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "../../users/entities/user.entity";
import { Profile } from "../../profiles/entities/profile.entity";

@Entity()
@ObjectType()
export class Player {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;
  @Column({ nullable: true })
  @Field()
  rank: number;
  @Column({ nullable: true, default: 1000 })
  @Field()
  rating: number;
  @OneToOne(() => User, (user) => user.player, {
    cascade: ["insert", "update"],
  })
  @Field(() => User)
  user: User;
  @OneToOne(() => Profile, (profile) => profile.player, {
    cascade: ["insert", "update"],
  })
  @Field(() => Profile)
  profile: Profile;
}
