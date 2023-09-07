import { ContextType } from "..";
import { UserRepository } from "../users/user.repository";
import { UpdateProfileInputDto } from "./dto/profileInputDto";
import { Profile } from "./entities/profile.entity";
import { ProfileRepository } from "./profile.repository";

export class ProfileService {
  static async getAllProfiles() {
    try {
      const profiles = await ProfileRepository.getAllProfiles();
      return profiles;
    } catch (error) {
      console.error("Error during profiles recuperation", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  static async updateProfile(
    ctx: ContextType,
    params: UpdateProfileInputDto
  ): Promise<Profile> {
    try {
      const userId = ctx.currentUser!.id;
      const emailAlreadyUsed = await UserRepository.checkIfEmailIsAlreadyUsed(
        userId,
        params.email
      );
      if (emailAlreadyUsed) throw new Error("EMAIL_ALREADY_USED");

      const usernameAlreadyUsed =
        await UserRepository.checkIfUsernameIsAlreadyUsed(
          userId,
          params.username
        );

      if (usernameAlreadyUsed) throw new Error("USERNAME_ALREADY_USED");

      const playerMode = await ProfileRepository.updateProfile(userId, params);
      return playerMode;
    } catch (error: any) {
      console.error("Error while switching player mode", error);
      switch (error.message) {
        case "EMAIL_ALREADY_USED":
          throw new Error("EMAIL_ALREADY_USED");
          break;
        case "USERNAME_ALREADY_USED":
          throw new Error("USERNAME_ALREADY_USED");
          break;
        default:
          throw new Error("INTERNAL_SERVER_ERROR");
      }
    }
  }
}
