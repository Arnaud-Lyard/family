import { Player } from "../players/entities/player.entity";
import { User } from "../users/entities/user.entity";
import { IContext } from "../utils/interfaces/context.interface";
import { UpdateProfileDto } from "./dto/profileInputDto";
import { Profile } from "./entities/profile.entity";

export class ProfileService {
  async getAllProfiles(ctx: IContext): Promise<Profile[]> {
    try {
      const profiles = await ctx.em.find(Profile, {});
      return profiles;
    } catch (error) {
      console.error("Error during profiles recuperation", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
  async updateProfile(
    ctx: IContext,
    profile: UpdateProfileDto
  ): Promise<Profile> {
    try {
      const userId = ctx.currentUser!.id;
      const user = await ctx.em.findOneOrFail(User, { id: userId });
      const player = await ctx.em.findOneOrFail(Player, { id: user.player.id });

      const userEmailAlreadyUsed = await ctx.em.findOne(User, {
        email: profile.email,
      });
      if (userEmailAlreadyUsed === null || userEmailAlreadyUsed.id === userId) {
        ctx.em.assign(user, { email: profile.email }, {});
      } else {
        throw new Error("EMAIL_ALREADY_USED");
      }

      const userUsernameAlreadyUsed = await ctx.em.findOne(User, {
        username: profile.username,
      });
      if (
        userUsernameAlreadyUsed === null ||
        userUsernameAlreadyUsed.id === userId
      ) {
        ctx.em.assign(user, { username: profile.username }, {});
      } else {
        throw new Error("USERNAME_ALREADY_USED");
      }

      const profileToUpdate = await ctx.em.findOneOrFail(Profile, {
        user: user,
      });

      const profileUpdated = {
        isPlayer: profile.isPlayer,
        battletag: profile.battletag,
        user,
        player,
      };

      ctx.em.assign(profileToUpdate, profileUpdated, {});
      await ctx.em.flush();
      return profileToUpdate;
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
