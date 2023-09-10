import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Profile } from "./entities/profile.entity";
import { ProfileService } from "./profile.service";
import { ContextType } from "../index";
import { UpdateProfileInputDto } from "./dto/profileInputDto";

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
  async updateProfile(
    @Ctx() ctx: ContextType,
    @Arg("data") data: UpdateProfileInputDto
  ): Promise<Profile> {
    try {
      const playerMode = await ProfileService.updateProfile(ctx, data);
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
