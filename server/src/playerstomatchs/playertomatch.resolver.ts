import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { PlayerToMatchService } from "./playertomatch.service";
import { PlayerToMatch } from "./entities/playertomatch.entity";
import { IContext } from "../utils/interfaces/context.interface";

@Resolver(PlayerToMatch)
export class PlayerToMatchResolver {
  constructor(private readonly playerToMatchService: PlayerToMatchService) {}
  @Authorized()
  @Query(() => Boolean)
  async checkIfNewMatch(@Ctx() ctx: IContext): Promise<boolean> {
    try {
      const isNewMatch = await this.playerToMatchService.checkIfNewMatch(ctx);
      return isNewMatch;
    } catch (error: any) {
      console.error("Error during new match check", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
}
