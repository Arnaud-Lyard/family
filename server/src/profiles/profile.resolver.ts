import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Profile } from "./entities/profile.entity";
import { ProfileService } from "./profile.service";
import { ContextType } from "../index";
import { TogglePlayerModeUpdateInputDto } from "./dto/profileInputDto";

@Resolver(Profile)
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
  async togglePlayerModeUpdate(
    @Ctx() ctx: ContextType,
    @Arg("data") data: TogglePlayerModeUpdateInputDto
  ): Promise<Profile> {
    try {
      const playerMode = await ProfileService.togglePlayerModeUpdate(ctx, data);
      return playerMode;
    } catch (error) {
      console.error("Error while switching player mode", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
}
