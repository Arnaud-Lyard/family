import { Ctx, Query, Resolver } from "type-graphql";
import { Player } from "./entities/player.entity";
import { PlayerService } from "./player.service";
import { IContext } from "../utils/interfaces/context.interface";

@Resolver(Player)
export class PlayerResolver {
  @Query(() => [Player])
  async getAllPlayers(@Ctx() ctx: IContext): Promise<Player[]> {
    try {
      return await ctx.services.playerService.getAllPlayers(ctx);
    } catch (error) {
      console.error("Error during all player recuperation", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
}
