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

      if (isPlayer === true) {
        const profileUpdated = await this.update(user, params);

        return profileUpdated;
      } else {
        const profileDisabled = await this.disabled(user);
        return profileDisabled;
      }
    } catch (error) {
      console.error("Error when updating profile query", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  static async create(user: User): Promise<Profile> {
    try {
      const profileCreated = DataSource.getRepository(Profile).create({
        player: user.player,
        user: user,
        isPlayer: false,
      });
      await DataSource.getRepository(Profile).insert(profileCreated);

      return profileCreated;
    } catch (error) {
      console.error("Error during profile creation request", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  static async update(
    user: User,
    params: UpdateProfileInputDto
  ): Promise<Profile> {
    try {
      const { isPlayer, battletag } = params;

      const profileUpdated = await DataSource.createQueryBuilder()
        .update(Profile)
        .set({
          isPlayer: isPlayer,
          battletag: battletag,
        })
        .where("id = :id", { id: user.profile.id })
        .returning("*")
        .execute();
      return profileUpdated.raw[0];
    } catch (error) {
      console.error("Error during profile update request", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }

  static async disabled(user: User): Promise<Profile> {
    try {
      const profileDisabled = await DataSource.createQueryBuilder()
        .update(Profile)
        .set({
          isPlayer: false,
          battletag: "",
        })
        .where("id = :id", { id: user.profile.id })
        .returning("*")
        .execute();

      return profileDisabled.raw[0];
    } catch (error) {
      console.error("Error during disable profile request", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
}
