import { ContextType } from "..";
import { TogglePlayerModeUpdateInputDto } from "./dto/profileInputDto";
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
  static async togglePlayerModeUpdate(
    ctx: ContextType,
    params: TogglePlayerModeUpdateInputDto
  ): Promise<Profile> {
    try {
      const userId = ctx.currentUser!.id;

      const playerMode = await ProfileRepository.togglePlayerModeUpdate(
        userId,
        params
      );
      return playerMode;
    } catch (error) {
      console.error("Error while switching player mode", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
}
