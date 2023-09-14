import { Field, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import User from "../../users/entities/user.entity";

@Entity()
@ObjectType()
export class Article {
  @PrimaryColumn({ default: () => "gen_random_uuid()" })
  @Field()
  id: string;
  @Field()
  @Column()
  title: string;
  @Field()
  @Column()
  content: string;
  @Field(() => User)
  @JoinColumn()
  @ManyToOne(() => User, (u) => u.articles)
  user: User;
}
