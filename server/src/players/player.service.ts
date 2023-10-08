import { Player } from "./entities/player.entity";
import { IContext } from "../utils/interfaces/context.interface";
import { EntityManager } from "@mikro-orm/postgresql";
import { User } from "../users/entities/user.entity";

export class PlayerService {
  async getAllPlayers(ctx: IContext): Promise<Player[]> {
    try {
      const players = ctx.em.find(
        Player,
        { profile: { isPlayer: true } },
        { populate: ["profile"] }
      );
      return players;
    } catch (error) {
      console.error("Error during all player recuperation", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
}
