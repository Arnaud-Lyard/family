import { Article } from "./entities/article.entity";
import { ArticleToBeUpdated, SaveArticle } from "./dto/articleInputDto";
import { IContext } from "../utils/interfaces/context.interface";
import { User } from "../users/entities/user.entity";

export class ArticleService {
  async saveArticle(params: SaveArticle, ctx: IContext): Promise<Article> {
    try {
      const user = await ctx.em.findOneOrFail(User, { id: params.userId });
      const articleToBeCreated = new Article(
        params.title,
        params.content,
        user
      );
      ctx.em.persist(articleToBeCreated);
      await ctx.em.flush();
      return articleToBeCreated;
    } catch (error) {
      console.error("Error while saving article", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  async getAdminArticles(userId: string, ctx: IContext): Promise<Article[]> {
    try {
      return await ctx.em.find(Article, { user: userId });
    } catch (error) {
      console.error("Error while getting admin articles", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  async getArticleByIdForAdmin(
    articleId: string,
    ctx: IContext
  ): Promise<Article> {
    try {
      return await ctx.em.findOneOrFail(Article, articleId);
    } catch (error) {
      console.error("Error while getting article by id for admin", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  async updateArticle(
    article: ArticleToBeUpdated,
    ctx: IContext
  ): Promise<Article> {
    try {
      const articleExist = await ctx.em.findOne(Article, article.id);
      if (!articleExist) {
        throw new Error("ARTICLE_NOT_FOUND");
      }
      articleExist.title = article.title;
      articleExist.content = article.content;

      ctx.em.persist(articleExist);
      await ctx.em.flush();

      return articleExist;
    } catch (error) {
      console.error("Article is not updated", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  async getAllArticles(ctx: IContext): Promise<Article[]> {
    try {
      return await ctx.em.find(Article, {}, { populate: ["user"] });
    } catch (error) {
      console.error("Error while getting articles", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  async getOneArticle(articleId: string, ctx: IContext): Promise<Article> {
    try {
      return await ctx.em.findOneOrFail(Article, articleId);
    } catch (error) {
      console.error("Error while getting article", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
}
