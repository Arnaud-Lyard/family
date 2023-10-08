import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Profile } from "./entities/profile.entity";
import { IContext } from "../utils/interfaces/context.interface";
import { UpdateProfileDto } from "./dto/profileInputDto";
import { Role } from "../users/entities/user.entity";

@Resolver(Profile)
export class ProfileResolver {
  @Authorized()
  @Query(() => [Profile])
  async getAllProfiles(@Ctx() ctx: IContext) {
    try {
      if (!ctx.currentUser!.roles.includes(Role.SUPERADMIN))
        throw new Error("UNAUTHORIZED");
      const profiles = await ctx.services.profileService.getAllProfiles(ctx);
      return profiles;
    } catch (error) {
      console.error("Error during profiles recuperation", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  @Authorized()
  @Mutation(() => Profile)
  async updateProfile(
    @Ctx() ctx: IContext,
    @Arg("data") data: UpdateProfileDto
  ): Promise<Profile> {
    try {
      return await ctx.services.profileService.updateProfile(ctx, data);
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
