import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
  User,
  UserAdminList,
  UserInformations,
  UserLoggedIn,
  UserRegisterInputDto,
  UserRegistered,
} from "./entities/user.entity";
import { IContext } from "../utils/interfaces/context.interface";
import { PromoteUserInputDto, UserLoginInputDto } from "./dto/userInputDto";

@Resolver(User)
export class UserResolver {
  @Mutation(() => UserRegistered)
  public async register(
    @Arg("data") data: UserRegisterInputDto,
    @Ctx() ctx: IContext
  ): Promise<UserRegistered> {
    try {
      return await ctx.services.userService.register(data, ctx);
    } catch (error: any) {
      console.error("error when registering user", error);
      if (error.message === "EMAIL_ALREADY_USED") {
        throw new Error("EMAIL_ALREADY_USED");
      } else if (error.message === "USERNAME_ALREADY_USED") {
        throw new Error("USERNAME_ALREADY_USED");
      } else throw new Error("INTERNAL_SERVER_ERROR");
    }
  }

  @Mutation(() => String)
  async login(
    @Arg("data") params: UserLoginInputDto,
    @Ctx() ctx: IContext
  ): Promise<string> {
    try {
      return await ctx.services.userService.login(params, ctx);
    } catch (error: any) {
      console.error("error when login process", error);
      if ((error.message = "INVALID_CREDENTIALS"))
        throw new Error("INVALID_CREDENTIALS");
      else throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  @Authorized()
  @Mutation(() => String)
  async logout(@Ctx() ctx: IContext): Promise<string> {
    try {
      await ctx.services.userService.logout(ctx);
      return "OK";
    } catch (err) {
      console.error("error when logout process", err);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }

  @Authorized()
  @Query(() => UserLoggedIn)
  async profile(@Ctx() ctx: IContext): Promise<UserLoggedIn> {
    try {
      return await ctx.services.userService.getProfile(ctx);
    } catch (err) {
      console.error("error when getting profile", err);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  @Authorized()
  @Query(() => UserInformations)
  async personnalInformations(@Ctx() ctx: IContext): Promise<UserInformations> {
    try {
      return ctx.services.userService.getPersonnalInformations(ctx);
    } catch (err) {
      console.error("error when getting personnal informations", err);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  @Authorized()
  @Mutation(() => UserInformations)
  async toggleAdminRole(
    @Ctx() ctx: IContext,
    @Arg("data") data: PromoteUserInputDto
  ): Promise<UserInformations> {
    try {
      return await ctx.services.userService.toggleAdminRole(ctx, data);
    } catch (err) {
      console.error("error when promoting user", err);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  @Authorized()
  @Query(() => [UserAdminList])
  async getAllAdminUsers(@Ctx() ctx: IContext): Promise<UserAdminList[]> {
    try {
      return await ctx.services.userService.getAllAdminUsers(ctx);
    } catch (err) {
      console.error("error when getting admin list", err);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
}
