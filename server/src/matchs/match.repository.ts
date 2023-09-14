import DataSource from "../database";
import { PlayerToMatch } from "../playerstomatchs/entities/playertomatch.entity";
import { Match } from "./entities/match.entity";

export class MatchRepository {
  static async generateMatch(
    userId: string,
    opponentId: string
  ): Promise<Match> {
    try {
      const match = DataSource.getRepository(Match).create({
        plannedDate: new Date(),
      });

      await DataSource.getRepository(Match).insert(match);

      const playerToMatchCreated = DataSource.getRepository(
        PlayerToMatch
      ).create({
        playerId: userId,
        matchId: match.id,
      });

      const opponentToMatchCreated = DataSource.getRepository(
        PlayerToMatch
      ).create({
        playerId: opponentId,
        matchId: match.id,
      });
      await DataSource.getRepository(PlayerToMatch).insert([
        opponentToMatchCreated,
        playerToMatchCreated,
      ]);
      return match;
    } catch (error) {
      console.error("Error during match generation query", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
}
