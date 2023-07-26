import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import datasource from "../database";
import User from "./entities/user.entity";
import { ContextType } from "../index";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { UserInputDto } from "./dto/userInputDto";
import { AuthService } from "../auth/auth.service";

@Resolver(User)
export class UserResolver {
  @Mutation(() => User)
  async register(@Arg("data") data: UserInputDto): Promise<User> {
    const exisitingUser = await datasource
      .getRepository(User)
      .findOne({ where: { email: data.email } });

    if (exisitingUser !== null) throw new Error("EMAIL_ALREADY_EXISTS");

    const hashedPassword = await AuthService.hashPassword(data.password);
    return await datasource
      .getRepository(User)
      .save({ ...data, hashedPassword });
  }

  @Mutation(() => String)
  async login(
    @Arg("data") { email, password }: UserInputDto,
    @Ctx() ctx: ContextType
  ): Promise<string> {
    const user = await datasource
      .getRepository(User)
      .findOne({ where: { email } });

    if (
      user === null ||
      typeof user.hashedPassword !== "string" ||
      !(await AuthService.verifyPassword(password, user.hashedPassword))
    )
      throw new Error("invalid credentials");

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
  @Query(() => User)
  async profile(@Ctx() ctx: ContextType): Promise<User> {
    return AuthService.getSafeAttributes(ctx.currentUser as User);
  }
}
