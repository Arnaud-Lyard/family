import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Article } from "./entities/article.entity";
import {
  GetArticleInputDto,
  SaveArticleInputDto,
  UpdateArticleInputDto,
} from "./dto/articleInputDto";
import { IContext } from "../utils/interfaces/context.interface";
import { Role } from "../users/entities/user.entity";

@Resolver(Article)
export class ArticleResolver {
  @Authorized()
  @Mutation(() => Article)
  async saveArticle(
    @Ctx() ctx: IContext,
    @Arg("data") data: SaveArticleInputDto
  ): Promise<Article> {
    try {
      const params = {
        userId: ctx.currentUser!.id,
        title: data.title,
        content: data.content,
      };
      return await ctx.services.articleService.saveArticle(params, ctx);
    } catch (error) {
      console.error(error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }

  @Authorized()
  @Query(() => [Article])
  async getAdminArticles(@Ctx() ctx: IContext): Promise<Article[]> {
    try {
      const user = ctx.currentUser!;
      if (
        !user.roles.includes(Role.ADMIN) &&
        !user.roles.includes(Role.SUPERADMIN)
      ) {
        throw new Error("UNAUTHORIZED");
      }
      return await ctx.services.articleService.getAdminArticles(user.id, ctx);
    } catch (error) {
      console.error("Error during admin articles recuperation", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  @Authorized()
  @Query(() => Article)
  async getArticleByIdForAdmin(
    @Ctx() ctx: IContext,
    @Arg("data") data: GetArticleInputDto
  ): Promise<Article> {
    try {
      const user = ctx.currentUser!;
      if (
        !user.roles.includes(Role.ADMIN) &&
        !user.roles.includes(Role.SUPERADMIN)
      ) {
        throw new Error("UNAUTHORIZED");
      }
      return await ctx.services.articleService.getArticleByIdForAdmin(
        data.id,
        ctx
      );
    } catch (error) {
      console.error("Error during admin article recuperation", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  @Authorized()
  @Mutation(() => Article)
  async updateArticle(
    @Ctx() ctx: IContext,
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

      if (
        !user.roles.includes(Role.ADMIN) &&
        !user.roles.includes(Role.SUPERADMIN)
      ) {
        throw new Error("UNAUTHORIZED");
      }
      return await ctx.services.articleService.updateArticle(params, ctx);
    } catch (error) {
      console.error("Error during article update", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  @Query(() => [Article])
  async getAllArticles(@Ctx() ctx: IContext): Promise<Article[]> {
    try {
      return await ctx.services.articleService.getAllArticles(ctx);
    } catch (error) {
      console.error("Error during articles recuperation", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  @Query(() => Article)
  async getOneArticle(
    @Arg("data") data: GetArticleInputDto,
    @Ctx() ctx: IContext
  ): Promise<Article> {
    try {
      const article = await ctx.services.articleService.getOneArticle(
        data.id,
        ctx
      );
      return article;
    } catch (error) {
      console.error("Error during one article recuperation", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
}
