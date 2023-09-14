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
  id: string;
}
@InputType()
export class UpdateArticleInputDto {
  @Field()
  id: string;
  @Field()
  title: string;
  @Field()
  content: string;
}
export interface ArticleToBeCreated {
  userId: string;
  title: string;
  content: string;
}

export interface ArticleToBeUpdated extends ArticleToBeCreated {
  id: string;
}
