import DataSource from "../database";
import User from "./entities/user.entity";

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
      console.error("Error during user recuperation operation", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  static async getUserById(id: number) {
    try {
      const user = await DataSource.getRepository(User).findOne({
        where: { id },
        relations: {
          profile: true,
        },
      });
      if (!user) throw new Error("USER_NOT_FOUND");
      return user;
    } catch (error) {
      console.error("Error during user recuperation operation", error);
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
      console.error("Error during user recuperation operation", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  static saveUser(user: User): Promise<User> {
    try {
      const userUpdated = DataSource.getRepository(User).save(user);
      return userUpdated;
    } catch (error) {
      console.error("Error during user creation operation", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  static async getAllUsers(): Promise<User[]> {
    try {
      const users = await DataSource.getRepository(User).find();
      return users;
    } catch (error) {
      console.error("Error during users recuperation operation", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
}
