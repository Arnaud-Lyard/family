import { IContext } from "../utils/interfaces/context.interface";
import {
  PromoteUserInputDto,
  UserLoginInputDto,
  UserRegisterInputDto,
  UserToBeRegistered,
} from "./dto/userInputDto";
// import { UserRepository } from "./user.repository";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/config";
import {
  Role,
  UserAdminList,
  UserInformations,
  UserLoggedIn,
  UserRegistered,
} from "./entities/user.entity";
import {
  EntityRepository,
  EntityManager,
  MikroORM,
} from "@mikro-orm/postgresql";
import { User } from "./entities/user.entity";
import { argon2id, hash, verify } from "argon2";
import { UseRequestContext } from "@mikro-orm/core";
import { Player } from "../players/entities/player.entity";
import { Profile } from "../profiles/entities/profile.entity";
import { ROLES } from "../constants/constants";

export interface IUserService {
  login(params: UserLoginInputDto, ctx: IContext): Promise<string>;
  logout(ctx: IContext): Promise<string>;
  getProfile(ctx: IContext): Promise<UserLoggedIn>;
  getPersonnalInformations(ctx: IContext): Promise<UserInformations>;
  toggleAdminRole(
    ctx: IContext,
    params: PromoteUserInputDto
  ): Promise<UserInformations>;
  getAllAdminUsers(ctx: IContext): Promise<UserAdminList[]>;
  register(data: UserRegisterInputDto): Promise<UserRegistered>;
  getUserByPlayerId(playerId: string): Promise<UserInformations>;
}
export class UserService {
  async login(params: UserLoginInputDto, ctx: IContext): Promise<string> {
    try {
      const { email, password } = params;
      const user = await ctx.em.findOne(User, { email: email });

      if (
        user === null ||
        !(await this.verifyPassword(password, user.hashedPassword))
      )
        throw new Error("INVALID_CREDENTIALS");

      const token = jwt.sign({ userId: user.id }, envConfig.JWT_PRIVATE_KEY);

      ctx.res.cookie("token", token, {
        secure: envConfig.NODE_ENV === "production",
        httpOnly: true,
      });

      return token;
    } catch (error: any) {
      console.error("Error during login process", error);
      if (error.message === "INVALID_CREDENTIALS")
        throw new Error("INVALID_CREDENTIALS");
      else throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  async logout(ctx: IContext): Promise<string> {
    try {
      ctx.res.clearCookie("token");
      return "OK";
    } catch (error) {
      console.error("Error while logout process", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  async getProfile(ctx: IContext): Promise<UserLoggedIn> {
    try {
      const user = await ctx.em.findOneOrFail(
        User,
        {
          id: ctx.currentUser!.id,
        },
        { populate: ["profile"] }
      );
      return {
        username: user.username,
        roles: user.roles,
        profile: user.profile,
      };
    } catch (error) {
      console.error("Error while getting profile", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  async getPersonnalInformations(ctx: IContext): Promise<UserInformations> {
    try {
      const personnalInformations = ctx.em.findOneOrFail(
        User,
        ctx.currentUser!.id,
        {
          populate: ["profile"],
          fields: ["id", "username", "email", "roles"],
        }
      );
      return personnalInformations;
    } catch (error) {
      console.error("Error while getting personnal informations", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  async toggleAdminRole(
    ctx: IContext,
    params: PromoteUserInputDto
  ): Promise<UserInformations> {
    if (!ctx.currentUser!.roles.includes(Role.SUPERADMIN)) {
      throw new Error("UNAUTHORIZED");
    } else {
      try {
        const { id, isAdmin } = params;
        const userToPromote = await ctx.em.findOneOrFail(User, id);

        const em = ctx.em as EntityManager;
        const qb = em.createQueryBuilder(User);

        const roles = isAdmin ? "{visitor,admin}" : "{visitor}";

        qb.update({ roles: roles as Role }).where({
          id: id,
        });

        await qb.execute();

        return {
          id: userToPromote.id,
          username: userToPromote.username,
          email: userToPromote.email,
          profile: userToPromote.profile,
        };
      } catch (error) {
        console.error("Error when promoting user", error);
        throw new Error("INTERNAL_SERVER_ERROR");
      }
    }
  }
  async getAllAdminUsers(ctx: IContext): Promise<UserAdminList[]> {
    try {
      if (!ctx.currentUser!.roles.includes(Role.SUPERADMIN)) {
        throw new Error("UNAUTHORIZED");
      }

      const em = ctx.em as EntityManager;
      const qb = em.createQueryBuilder(User);

      const users = qb.select("*").where({
        $or: [{ roles: "{visitor,admin}" }, { roles: "{visitor}" }],
      });
      return users;
    } catch (error) {
      console.error("Error when getting all admin users", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  public async register(
    data: UserRegisterInputDto,
    ctx: IContext
  ): Promise<UserRegistered> {
    try {
      const exisitingEmail = await ctx.em.findOne(User, { email: data.email });
      if (exisitingEmail !== null) throw new Error("EMAIL_ALREADY_USED");

      const exisitingUsername = await ctx.em.findOne(User, {
        username: data.username,
      });
      if (exisitingUsername !== null) throw new Error("USERNAME_ALREADY_USED");

      const hashedPassword = await this.hashPassword(data.password);

      const player = new Player();
      const user = new User(data.username, data.email, hashedPassword, player);

      const profile = ctx.em.create(Profile, {
        isPlayer: false,
        battletag: "",
        user: user,
        player: player,
      });

      ctx.em.persist(profile);
      await ctx.em.flush();

      return { username: user.username, email: user.email };
    } catch (error: any) {
      console.error("Error while registering user", error);
      if (error.message === "EMAIL_ALREADY_USED") {
        throw new Error("EMAIL_ALREADY_USED");
      } else if (error.message === "USERNAME_ALREADY_USED") {
        throw new Error("USERNAME_ALREADY_USED");
      } else throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  // async getUserByPlayerId(playerId: string): Promise<UserInformations> {
  //   try {
  //     const user = await .findOneOrFail(playerId);
  //     return user;
  //   } catch (error) {
  //     console.error("Error when getting user by player id", error);
  //     throw new Error("INTERNAL_SERVER_ERROR");
  //   }
  // }
  private hashingOptions = {
    memoryCost: 2 ** 16,
    timeCost: 5,
    type: argon2id,
  };

  private hashPassword = async (plainPassword: string): Promise<string> =>
    await hash(plainPassword, this.hashingOptions);

  private verifyPassword = async (
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> =>
    await verify(hashedPassword, plainPassword, this.hashingOptions);
}
