import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { ContextType } from "..";
import { PlayerToMatchService } from "./playertomatch.service";
import { PlayerToMatch } from "./entities/playertomatch.entity";

@Resolver(PlayerToMatch)
export class PlayerToMatchResolver {
  @Authorized()
  @Query(() => Boolean)
  async checkIfNewMatch(@Ctx() ctx: ContextType): Promise<boolean> {
    try {
      const isNewMatch = await PlayerToMatchService.checkIfNewMatch(ctx);
      return isNewMatch;
    } catch (error: any) {
      console.error("Error during new match check", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
}
