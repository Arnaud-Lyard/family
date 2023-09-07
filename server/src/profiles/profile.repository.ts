import DataSource from "../database";
import User from "../users/entities/user.entity";
import { UserRepository } from "../users/user.repository";
import { UpdateProfileInputDto } from "./dto/profileInputDto";
import { Profile } from "./entities/profile.entity";

export class ProfileRepository {
  static async getAllProfiles() {
    try {
      const profiles = await DataSource.getRepository(Profile).find();
      return profiles;
    } catch (error) {
      console.error("Error during profiles recuperation request", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  static async updateProfile(
    userId: number,
    params: UpdateProfileInputDto
  ): Promise<Profile> {
    try {
      const { isPlayer, battletag } = params;
      const user = await UserRepository.getUserById(userId);
      const userProfileUpdated = await DataSource.getRepository(User).save({
        ...user,
        profile: { ...user.profile, isPlayer: isPlayer, battletag: battletag },
      });
      return userProfileUpdated.profile;
    } catch (error) {
      console.error("Error when switching player mode request", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  static async create(user: User): Promise<Profile> {
    try {
      const profile = await DataSource.getRepository(Profile).save({
        user: user,
      });
      return profile;
    } catch (error) {
      console.error("Error during profile creation request", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
}
