import { generateMatchInputDto } from "./dto/matchInputDto";
import { isPastDate } from "../utils/isPastDate";
import dayjs from "dayjs";
import { Role, User } from "../users/entities/user.entity";
import { IContext } from "../utils/interfaces/context.interface";
import { Match, Status } from "./entities/match.entity";
import { Player } from "../players/entities/player.entity";

export class MatchService {
  async generateMatch(
    ctx: IContext,
    data: generateMatchInputDto
  ): Promise<Match> {
    try {
      const { opponentId, date } = data;
      if (!dayjs(date).isValid()) {
        throw new Error("INVALID_DATE");
      }

      if (isPastDate(date)) throw new Error("DATE_IS_PAST");

      const user = await ctx.em.findOneOrFail(User, ctx.currentUser!.id);
      const player = await ctx.em.findOneOrFail(Player, user.player.id);
      if (player.id === opponentId)
        throw new Error("CANT_PLAY_AGAINST_YOURSELF");
      const opponent = await ctx.em.findOneOrFail(Player, opponentId);
      const match = new Match(Status.PENDING, date);

      match.players.add(player);
      player.matchs.add(match);

      match.players.add(opponent);
      opponent.matchs.add(match);

      ctx.em.persist(match);
      ctx.em.persist(opponent);
      ctx.em.persist(player);
      await ctx.em.flush();
      return match;
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
  async getUserByPlayerId(playerId: string, ctx: IContext): Promise<User> {
    try {
      const player = await ctx.em.findOneOrFail(
        Player,
        { id: playerId },
        {
          populate: ["user"],
        }
      );
      const user = player.user;
      return user;
    } catch (error) {
      console.error("Error during user recuperation", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }

  async getWaitingMatchs(ctx: IContext): Promise<Match[]> {
    try {
      const player = ctx.currentUser!.player.id;
      const matchs = await ctx.em.find(
        Match,
        { status: Status.PENDING, players: { id: player } },

        {
          populate: ["players"],
        }
      );
      console.log(matchs);
      return matchs;
    } catch (error) {
      console.error("Error during waiting matchs recuperation", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
}
