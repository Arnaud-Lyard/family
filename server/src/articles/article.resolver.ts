import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Article } from "./entities/article.entity";
import { ArticleService } from "./article.service";
import {
  GetArticleInputDto,
  SaveArticleInputDto,
  UpdateArticleInputDto,
} from "./entities/dto/articleInputDto";
import { ContextType } from "../index";

@Resolver(Article)
export class ArticleResolver {
  @Query(() => [Article])
  async articles(): Promise<Article[]> {
    return [];
  }
  @Authorized()
  @Mutation(() => Article)
  async saveArticle(
    @Ctx() ctx: ContextType,
    @Arg("data") data: SaveArticleInputDto
  ): Promise<Article> {
    try {
      const params = {
        userId: ctx.currentUser!.id,
        title: data.title,
        content: data.content,
      };
      const articleCreated = await ArticleService.saveArticle(params);
      return articleCreated;
    } catch (error) {
      console.error(error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }

  @Authorized()
  @Query(() => [Article])
  async getAdminArticles(@Ctx() ctx: ContextType): Promise<Article[]> {
    try {
      const user = ctx.currentUser!;
      if (user.role !== "admin" && user.role !== "superadmin") {
        throw new Error("UNAUTHORIZED");
      }
      const articles = await ArticleService.getAdminArticles(user.id);
      return articles;
    } catch (error) {
      console.error("Error during admin articles recuperation", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  @Authorized()
  @Query(() => Article)
  async getArticleByIdForAdmin(
    @Ctx() ctx: ContextType,
    @Arg("data") data: GetArticleInputDto
  ): Promise<Article> {
    try {
      const user = ctx.currentUser!;
      if (user.role !== "admin" && user.role !== "superadmin") {
        throw new Error("UNAUTHORIZED");
      }
      const article = await ArticleService.getArticleByIdForAdmin(data.id);
      return article;
    } catch (error) {
      console.error("Error during admin article recuperation", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  @Authorized()
  @Mutation(() => Article)
  async updateArticle(
    @Ctx() ctx: ContextType,
    @Arg("data") data: UpdateArticleInputDto
  ): Promise<Article> {
    try {
      const user = ctx.currentUser!;
      const params = {
        userId: ctx.currentUser!.id,
        id: data.id,
        title: data.title,
        content: data.content,
      };

      if (user.role !== "admin" && user.role !== "superadmin") {
        throw new Error("UNAUTHORIZED");
      }
      const articleUpdated = await ArticleService.updateArticle(params);
      return articleUpdated;
    } catch (error) {
      console.error("Error during article update", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  @Query(() => [Article])
  async getAllArticles(): Promise<Article[]> {
    try {
      const articles = await ArticleService.getAllArticles();
      return articles;
    } catch (error) {
      console.error("Error during articles recuperation", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  @Query(() => Article)
  async getOneArticle(@Arg("data") data: GetArticleInputDto): Promise<Article> {
    try {
      const article = await ArticleService.getOneArticle(data.id);
      return article;
    } catch (error) {
      console.error("Error during one article recuperation", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
}
