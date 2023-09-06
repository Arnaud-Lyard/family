import { Arg, Authorized, Ctx, Mutation, Query } from "type-graphql";
import { Profile } from "./entities/profile.entity";
import { ProfileService } from "./profile.service";
import { ContextType } from "../index";
import { TogglePlayerModeInputDto } from "./dto/profileInputDto";

export class ProfileResolver {
  @Authorized()
  @Query(() => [Profile])
  async getAllProfiles(@Ctx() ctx: ContextType) {
    try {
      if (ctx.currentUser!.role !== "superadmin")
        throw new Error("UNAUTHORIZED");
      const profiles = await ProfileService.getAllProfiles();
      return profiles;
    } catch (error) {
      console.error("Error during profiles recuperation", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  @Authorized()
  @Mutation(() => Profile)
  async togglePlayerMode(
    @Ctx() ctx: ContextType,
    @Arg("data") data: TogglePlayerModeInputDto
  ): Promise<Profile> {
    const params = { isPlayer: data.isPlayer, userId: ctx.currentUser!.id };
    try {
      const playerMode = await ProfileService.togglePlayerMode(params);
      return playerMode;
    } catch (error) {
      console.error("Error while switching player mode", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
}
