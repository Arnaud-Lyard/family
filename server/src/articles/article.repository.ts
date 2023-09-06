import DataSource from "../database";
import { Article } from "./entities/article.entity";
import {
  ArticleToBeCreated,
  ArticleToBeUpdated,
} from "./entities/dto/articleInputDto";

export class ArticleRepository {
  static async createOneArticle(params: ArticleToBeCreated): Promise<Article> {
    const article = await DataSource.getRepository(Article).save({
      title: params.title,
      content: params.content,
      user: { id: params.userId },
    });
    return article;
  }
  static async getArticlesByUserId(userId: number): Promise<Article[]> {
    const articles = await DataSource.getRepository(Article).find({
      where: { user: { id: userId } },
    });
    return articles;
  }
  static async getOneArticleById(articleId: number): Promise<Article> {
    const article = await DataSource.getRepository(Article).findOne({
      where: {
        id: articleId,
      },
    });
    if (!article) {
      throw new Error("ARTICLE_NOT_FOUND");
    }
    return article;
  }
  static async updateOneArticle(params: ArticleToBeUpdated): Promise<Article> {
    const article = await DataSource.getRepository(Article).save({
      id: params.id,
      title: params.title,
      content: params.content,
    });
    return article;
  }
  static async getAllArticlesWithUsers(): Promise<Article[]> {
    const articles = await DataSource.getRepository(Article).find({
      relations: ["user"],
    });
    return articles;
  }
  static async getOneArticleByIdWithUser(articleId: number): Promise<Article> {
    const article = await DataSource.getRepository(Article).findOne({
      where: { id: articleId },
      relations: ["user"],
    });
    if (!article) {
      throw new Error("ARTICLE_NOT_FOUND");
    }
    return article;
  }
}
