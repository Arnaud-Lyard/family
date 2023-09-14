import { ContextType } from "..";
import { PlayerRepository } from "../players/player.repository";
import { Match } from "./entities/match.entity";
import { MatchRepository } from "./match.repository";

export class MatchService {
  static async generateMatch(
    userId: ContextType,
    opponentId: string
  ): Promise<Match> {
    try {
      const player = await PlayerRepository.getPlayerByUserId(
        userId.currentUser!.id
      );
      const opponent = await PlayerRepository.getPlayerByUserId(opponentId);
      return await MatchRepository.generateMatch(player.id, opponent.id);
    } catch (error) {
      console.error("Error during match generation", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
}
