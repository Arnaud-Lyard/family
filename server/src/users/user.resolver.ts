import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import datasource from "../database";
import User, { UserInformations, UserLoggedIn } from "./entities/user.entity";
import { ContextType } from "../index";
import jwt from "jsonwebtoken";
import config from "../config/config";
import {
  UserLoginInputDto,
  UserRegisterInputDto,
  UserToBeRegistered,
} from "./dto/userInputDto";
import { AuthService } from "../auth/auth.service";

@Resolver(User)
export class UserResolver {
  @Mutation(() => UserLoggedIn)
  async register(
    @Arg("data") data: UserRegisterInputDto
  ): Promise<UserLoggedIn> {
    const exisitingEmail = await datasource
      .getRepository(User)
      .findOne({ where: { email: data.email } });

    if (exisitingEmail !== null) throw new Error("INTERNAL_SERVER_ERROR");

    const existingUsername = await datasource
      .getRepository(User)
      .findOne({ where: { username: data.username } });

    if (existingUsername !== null) throw new Error("USERNAME_ALREADY_EXISTS");

    const hashedPassword = await AuthService.hashPassword(data.password);

    const user: UserToBeRegistered = {
      username: data.username,
      email: data.email,
      hashedPassword: hashedPassword,
    };

    const userRegistered = await datasource.getRepository(User).save(user);

    return { username: userRegistered.username };
  }

  @Mutation(() => String)
  async login(
    @Arg("data") { email, password }: UserLoginInputDto,
    @Ctx() ctx: ContextType
  ): Promise<string> {
    const user = await datasource
      .getRepository(User)
      .findOne({ where: { email } });

    if (
      user === null ||
      !(await AuthService.verifyPassword(password, user.hashedPassword))
    )
      throw new Error("INVALID_CREDENTIALS");

    const token = jwt.sign({ userId: user.id }, config.JWT_PRIVATE_KEY);

    ctx.res.cookie("token", token, {
      secure: config.NODE_ENV === "production",
      httpOnly: true,
    });

    return token;
  }
  @Authorized()
  @Mutation(() => String)
  async logout(@Ctx() ctx: ContextType): Promise<string> {
    ctx.res.clearCookie("token");
    return "OK";
  }

  @Authorized()
  @Query(() => UserLoggedIn)
  async profile(@Ctx() ctx: ContextType): Promise<UserLoggedIn> {
    const profile = await datasource.getRepository(User).findOne({
      where: { id: ctx.currentUser?.id },
    });
    return { username: profile?.username, role: profile?.role } as UserLoggedIn;
  }
  @Authorized()
  @Query(() => UserInformations)
  async personnalInformations(
    @Ctx() ctx: ContextType
  ): Promise<UserInformations> {
    const personnalInformations = await datasource.getRepository(User).findOne({
      where: { id: ctx.currentUser?.id },
    });
    if (!personnalInformations) throw new Error("INTERNAL_SERVER_ERROR");
    return personnalInformations;
  }
  @Authorized()
  @Mutation(() => UserInformations)
  async promoteUser(
    @Ctx() ctx: ContextType,
    @Arg("data") userId: number
  ): Promise<UserInformations> {
    try {
      if (ctx.currentUser?.role === "superadmin") {
        const userToBePromoted = await datasource.getRepository(User).findOne({
          where: { id: userId },
        });
        if (!userToBePromoted) throw new Error("INTERNAL_SERVER_ERROR");
        userToBePromoted.role = "admin";
        await datasource.getRepository(User).save(userToBePromoted);
        return userToBePromoted;
      } else {
        throw new Error("INTERNAL_SERVER_ERROR");
      }
    } catch (err) {
      console.error(err);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  @Authorized()
  @Query(() => [UserInformations])
  async getAllUsers(): Promise<UserInformations[]> {
    try {
      const users = await datasource.getRepository(User).find();
      return users;
    } catch (err) {
      console.error(err);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
}
