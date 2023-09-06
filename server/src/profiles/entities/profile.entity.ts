import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "../../users/entities/user.entity";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @Field()
  isPlayer: boolean;
  @OneToOne(() => User, (user) => user.profile)
  @Field(() => User)
  user: User;
}
