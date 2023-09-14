import { Not } from "typeorm";
import DataSource from "../database";
import User from "./entities/user.entity";
import { UserToBeRegistered } from "./dto/userInputDto";
import { ProfileRepository } from "../profiles/profile.repository";
import { PlayerRepository } from "../players/player.repository";
import { Player } from "../players/entities/player.entity";

export class UserRepository {
  static async getUserByUsername(username: string) {
    try {
      const user = await DataSource.getRepository(User).findOne({
        where: { username },
        relations: {
          profile: true,
        },
      });
      if (!user) throw new Error("USER_NOT_FOUND");
      return user;
    } catch (error) {
      console.error("Error during user recuperation request", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  static async getUserById(id: string) {
    try {
      const user = await DataSource.getRepository(User).findOne({
        where: { id },
        relations: {
          profile: true,
          player: true,
        },
      });
      if (!user) throw new Error("USER_NOT_FOUND");
      return user;
    } catch (error) {
      console.error("Error during user recuperation request", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  static async getUserToLogin(email: string) {
    try {
      const user = await DataSource.getRepository(User).findOne({
        where: { email },
      });
      return user;
    } catch (error) {
      console.error("Error during user recuperation request", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  static saveUser(user: User): Promise<User> {
    try {
      const userUpdated = DataSource.getRepository(User).save(user);
      return userUpdated;
    } catch (error) {
      console.error("Error during user creation request", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  static async getAllUsers(): Promise<User[]> {
    try {
      const users = await DataSource.getRepository(User).find();
      return users;
    } catch (error) {
      console.error("Error during users recuperation request", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  static async checkIfEmailIsAlreadyUsed(
    userId: string,
    email: string
  ): Promise<User | null> {
    try {
      const user = await DataSource.getRepository(User).findOne({
        where: { id: Not(userId), email },
      });
      return user;
    } catch (error) {
      console.error("Error during user recuperation request", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  static async checkIfUsernameIsAlreadyUsed(
    userId: string,
    username: string
  ): Promise<User | null> {
    try {
      const user = await DataSource.getRepository(User).findOne({
        where: { id: Not(userId), username },
      });
      return user;
    } catch (error) {
      console.error("Error during user recuperation request", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  static async isEmailUsed(email: string): Promise<User | null> {
    try {
      const user = await DataSource.getRepository(User).findOne({
        where: { email },
      });
      return user;
    } catch (error) {
      console.error("Error during user recuperation request", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  static async isUsernameUsed(username: string): Promise<User | null> {
    try {
      const user = await DataSource.getRepository(User).findOne({
        where: { username },
      });
      return user;
    } catch (error) {
      console.error("Error during user recuperation request", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  static async register(user: UserToBeRegistered): Promise<User> {
    try {
      const player = await PlayerRepository.create();
      const userRegistered = await this.create(user, player);
      await ProfileRepository.create(userRegistered);
      return userRegistered;
    } catch (error) {
      console.error("Error during user creation request", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  static async create(user: UserToBeRegistered, player: Player): Promise<User> {
    try {
      const userCreated = DataSource.getRepository(User).create({
        ...user,
        player: player,
      });
      await DataSource.getRepository(User).insert(userCreated);
      return userCreated;
    } catch (error) {
      console.error("Error during user creation request", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
}
