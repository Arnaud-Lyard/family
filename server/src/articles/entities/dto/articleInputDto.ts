import { Field, InputType } from "type-graphql";

@InputType()
export class SaveArticleInputDto {
  @Field()
  title: string;
  @Field()
  content: string;
}

@InputType()
export class GetArticleInputDto {
  @Field()
  id: number;
}
@InputType()
export class UpdateArticleInputDto {
  @Field()
  id: number;
  @Field()
  title: string;
  @Field()
  content: string;
}
export interface ArticleToBeCreated {
  userId: number;
  title: string;
  content: string;
}

export interface ArticleToBeUpdated extends ArticleToBeCreated {
  id: number;
}
