import { ArticleRepository } from "./article.repository";
import { Article } from "./entities/article.entity";
import {
  ArticleToBeCreated,
  ArticleToBeUpdated,
} from "./entities/dto/articleInputDto";

export class ArticleService {
  static async saveArticle(params: ArticleToBeCreated): Promise<Article> {
    const article = ArticleRepository.createOneArticle(params);
    return article;
  }
  static async getAdminArticles(userId: number): Promise<Article[]> {
    const articles = ArticleRepository.getArticlesByUserId(userId);
    return articles;
  }
  static async getArticleByIdForAdmin(articleId: number): Promise<Article> {
    const article = ArticleRepository.getOneArticleById(articleId);
    return article;
  }
  static async updateArticle(params: ArticleToBeUpdated): Promise<Article> {
    try {
      const articleExist = await ArticleRepository.getOneArticleById(params.id);
      if (!articleExist) {
        throw new Error("ARTICLE_NOT_FOUND");
      }
      console.log("count");
      const article = ArticleRepository.updateOneArticle(params);
      return article;
    } catch (error) {
      console.error("Article is not updated", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
}
