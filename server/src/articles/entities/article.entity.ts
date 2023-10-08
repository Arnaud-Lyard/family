import { Field, ObjectType } from "type-graphql";

import { User } from "../../users/entities/user.entity";
import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
@Entity()
@ObjectType()
export class Article {
  @PrimaryKey({ type: "uuid", defaultRaw: "uuid_generate_v4()" })
  @Field()
  id!: string;
  @Field()
  @Property()
  title!: string;
  @Field()
  @Property()
  content!: string;
  @Field(() => User)
  @ManyToOne(() => User)
  user!: User;

  constructor(title: string, content: string, user: User) {
    this.title = title;
    this.content = content;
    this.user = user;
  }
}
