import { Query, Resolver } from "type-graphql";
import { Article } from "./entities/article.entity";

@Resolver(Article)
export class ArticleResolver {
  @Query(() => [Article])
  async articles(): Promise<Article[]> {
    return [];
  }
}
