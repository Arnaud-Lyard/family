import { db } from "../database";
import { PlayerToMatch } from "./entities/playertomatch.entity";

export class PlayerToMatchRepository {
  static async checkIfNewMatch(playerId: string): Promise<PlayerToMatch[]> {
    try {
      return await db.getRepository(PlayerToMatch).find({
        relations: ["match"],
        where: {
          playerId,
          match: {
            status: "waiting",
          },
        },
      });
    } catch (error) {
      console.error("Error during new match check query", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
}
