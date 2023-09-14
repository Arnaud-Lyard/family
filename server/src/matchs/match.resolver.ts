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
      return await MatchService.generateMatch(ctx, data.opponentId);
    } catch (error) {
      console.error("Error during match generation", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
}
