import { db } from "../database";
import { PlayerToMatch } from "../playerstomatchs/entities/playertomatch.entity";
import { Match } from "./entities/match.entity";

export class MatchRepository {
  static async generateMatch(
    userId: string,
    opponentId: string,
    date: Date
  ): Promise<Match> {
    try {
      const match = db.getRepository(Match).create({
        plannedDate: date,
      });

      await db.getRepository(Match).insert(match);

      const playerToMatchCreated = db.getRepository(PlayerToMatch).create({
        playerId: userId,
        matchId: match.id,
      });

      const opponentToMatchCreated = db.getRepository(PlayerToMatch).create({
        playerId: opponentId,
        matchId: match.id,
      });
      await db
        .getRepository(PlayerToMatch)
        .insert([opponentToMatchCreated, playerToMatchCreated]);
      return match;
    } catch (error) {
      console.error("Error during match generation query", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
}
