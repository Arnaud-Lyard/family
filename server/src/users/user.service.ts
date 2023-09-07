import { ContextType } from "..";
import { AuthService } from "../auth/auth.service";
import {
  PromoteUserInputDto,
  UserLoginInputDto,
  UserRegisterInputDto,
  UserToBeRegistered,
} from "./dto/userInputDto";
import { UserRepository } from "./user.repository";
import jwt from "jsonwebtoken";
import config from "../config/config";
import {
  UserAdminList,
  UserInformations,
  UserLoggedIn,
} from "./entities/user.entity";

export class UserService {
  static async login(
    params: UserLoginInputDto,
    ctx: ContextType
  ): Promise<string> {
    try {
      const { email, password } = params;
      const user = await UserRepository.getUserToLogin(email);

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
    } catch (error) {
      console.error("Error when login process", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  static async logout(ctx: ContextType): Promise<string> {
    try {
      ctx.res.clearCookie("token");
      return "OK";
    } catch (error) {
      console.error("Error when logout process", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  static async getProfile(ctx: ContextType): Promise<UserLoggedIn> {
    try {
      const user = await UserRepository.getUserById(ctx.currentUser!.id);
      return { username: user.username, role: user.role };
    } catch (error) {
      console.error("Error when getting profile", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  static async getPersonnalInformations(
    ctx: ContextType
  ): Promise<UserInformations> {
    try {
      const personnalInformations = UserRepository.getUserById(
        ctx.currentUser!.id
      );
      return personnalInformations;
    } catch (error) {
      console.error("Error when getting personnal informations", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  static async toggleAdminRole(
    ctx: ContextType,
    params: PromoteUserInputDto
  ): Promise<UserInformations> {
    if (ctx.currentUser!.role !== "superadmin") {
      throw new Error("UNAUTHORIZED");
    } else {
      try {
        const { id, isAdmin } = params;
        const userToPromote = await UserRepository.getUserById(id);
        userToPromote.role = isAdmin === false ? "admin" : "visitor";
        const userUpdated = await UserRepository.saveUser(userToPromote);
        return userUpdated;
      } catch (error) {
        console.error("Error when promoting user", error);
        throw new Error("INTERNAL_SERVER_ERROR");
      }
    }
  }
  static async getAllAdminUsers(ctx: ContextType): Promise<UserAdminList[]> {
    try {
      if (ctx.currentUser!.role !== "superadmin") {
        throw new Error("UNAUTHORIZED");
      }
      const users = await UserRepository.getAllUsers();
      return users;
    } catch (error) {
      console.error("Error when getting all admin users", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  static async register(data: UserRegisterInputDto): Promise<UserInformations> {
    try {
      const exisitingEmail = await UserRepository.isEmailUsed(data.email);
      if (exisitingEmail !== null) throw new Error("EMAIL_ALREADY_USED");
      const exisitingUsername = await UserRepository.isUsernameUsed(
        data.username
      );
      if (exisitingUsername !== null) throw new Error("USERNAME_ALREADY_USED");

      const hashedPassword = await AuthService.hashPassword(data.password);

      const UserToRegister: UserToBeRegistered = {
        username: data.username,
        email: data.email,
        hashedPassword: hashedPassword,
      };

      const userRegistered = await UserRepository.register(UserToRegister);
      return userRegistered;
    } catch (error) {
      console.error("Error when registering user", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
}
