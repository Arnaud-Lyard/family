import { PlayerModeToBeChanged } from "./dto/profileInputDto";
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
  static async togglePlayerMode(
    params: PlayerModeToBeChanged
  ): Promise<Profile> {
    try {
      const playerMode = await ProfileRepository.togglePlayerMode(params);
      return playerMode;
    } catch (error) {
      console.error("Error while switching player mode", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
}
