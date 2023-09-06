import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "../../users/entities/user.entity";

@Entity()
@ObjectType()
export class Article {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;
  @Field()
  @Column()
  title: string;
  @Field()
  @Column()
  content: string;
  @Field(() => User)
  @ManyToOne(() => User, (u) => u.articles)
  user: User;
}
