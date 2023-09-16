import { Arg, Authorized, Ctx, Mutation } from "type-graphql";
import { Match } from "./entities/match.entity";
import { MatchService } from "./match.service";
import { ContextType } from "..";
import { generateMatchInputDto } from "./dto/generateMatchInputDto";

export class MatchResolver {
  @Authorized()
  @Mutation(() => Match)
  async generateMatch(
    @Ctx() ctx: ContextType,
    @Arg("data") data: generateMatchInputDto
  ): Promise<Match> {
    try {
      return await MatchService.generateMatch(ctx, data);
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
