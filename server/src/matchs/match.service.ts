import { ContextType } from "..";
import { PlayerRepository } from "../players/player.repository";
import { UserRepository } from "../users/user.repository";
import { generateMatchInputDto } from "./dto/generateMatchInputDto";
import { Match } from "./entities/match.entity";
import { MatchRepository } from "./match.repository";
import { isPastDate } from "../utils/isPastDate";
import dayjs from "dayjs";

export class MatchService {
  static async generateMatch(
    userId: ContextType,
    data: generateMatchInputDto
  ): Promise<Match> {
    try {
      const { opponentId, date } = data;
      if (!dayjs(date).isValid()) {
        throw new Error("INVALID_DATE");
      }

      if (isPastDate(date)) throw new Error("DATE_IS_PAST");

      const user = await UserRepository.getUserById(userId.currentUser!.id);
      if (user.player.id === opponentId)
        throw new Error("CANT_PLAY_AGAINST_YOURSELF");

      const opponent = await PlayerRepository.getPlayerById(opponentId);
      return await MatchRepository.generateMatch(
        user.player.id,
        opponent.id,
        date
      );
    } catch (error: any) {
      console.error("Error during match generation", error);
      if (error.message === "INVALID_DATE") throw new Error("INVALID_DATE");
      else if (error.message === "DATE_IS_PAST")
        throw new Error("DATE_IS_PAST");
      else if (error.message === "CANT_PLAY_AGAINST_YOURSELF")
        throw new Error("CANT_PLAY_AGAINST_YOURSELF");
      else throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
}
