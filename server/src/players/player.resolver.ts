import { Query, Resolver } from "type-graphql";
import { Player } from "./entities/player.entity";
import { PlayerService } from "./player.service";

@Resolver(Player)
export class PlayerResolver {
  @Query(() => [Player])
  async getAllPlayers(): Promise<Player[]> {
    try {
      return await PlayerService.getAllPlayers();
    } catch (error) {
      console.error("Error during all player recuperation", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
}
