import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import User, {
  UserAdminList,
  UserInformations,
  UserLoggedIn,
} from "./entities/user.entity";
import { ContextType } from "../index";
import {
  PromoteUserInputDto,
  UserLoginInputDto,
  UserRegisterInputDto,
} from "./dto/userInputDto";
import { UserService } from "./user.service";

@Resolver(User)
export class UserResolver {
  @Mutation(() => UserLoggedIn)
  async register(
    @Arg("data") data: UserRegisterInputDto
  ): Promise<UserInformations> {
    try {
      const userRegistered = await UserService.register(data);
      return userRegistered;
    } catch (err) {
      console.error("error when registering user", err);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }

  @Mutation(() => String)
  async login(
    @Arg("data") params: UserLoginInputDto,
    @Ctx() ctx: ContextType
  ): Promise<string> {
    try {
      const token = await UserService.login(params, ctx);
      return token;
    } catch (err) {
      console.error("error when login process", err);
      throw new Error("INVALID_CREDENTIALS");
    }
  }
  @Authorized()
  @Mutation(() => String)
  async logout(@Ctx() ctx: ContextType): Promise<string> {
    try {
      await UserService.logout(ctx);
      return "OK";
    } catch (err) {
      console.error("error when logout process", err);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }

  @Authorized()
  @Query(() => UserLoggedIn)
  async profile(@Ctx() ctx: ContextType): Promise<UserLoggedIn> {
    try {
      const userLoggedIn = await UserService.getProfile(ctx);
      return userLoggedIn;
    } catch (err) {
      console.error("error when getting profile", err);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  @Authorized()
  @Query(() => UserInformations)
  async personnalInformations(
    @Ctx() ctx: ContextType
  ): Promise<UserInformations> {
    try {
      const personnalInformations = UserService.getPersonnalInformations(ctx);
      return personnalInformations;
    } catch (err) {
      console.error("error when getting personnal informations", err);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  @Authorized()
  @Mutation(() => UserInformations)
  async toggleAdminRole(
    @Ctx() ctx: ContextType,
    @Arg("data") data: PromoteUserInputDto
  ): Promise<UserInformations> {
    try {
      const user = await UserService.toggleAdminRole(ctx, data);
      return user;
    } catch (err) {
      console.error("error when promoting user", err);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  @Authorized()
  @Query(() => [UserAdminList])
  async getAllAdminUsers(@Ctx() ctx: ContextType): Promise<UserAdminList[]> {
    try {
      const adminList = await UserService.getAllAdminUsers(ctx);
      return adminList;
    } catch (err) {
      console.error("error when getting admin list", err);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
}
