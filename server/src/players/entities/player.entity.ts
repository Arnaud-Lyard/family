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
  @Column()
  @Field()
  rank: number;
  @OneToOne(() => User, (user) => user.player, { cascade: true })
  @Field(() => User)
  user: User;
  @OneToOne(() => Profile, (profile) => profile.player, { cascade: true })
  @Field(() => Profile)
  profile: Profile;
}
