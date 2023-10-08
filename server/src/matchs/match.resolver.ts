import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  PubSub,
  PubSubEngine,
  Root,
  Subscription,
} from "type-graphql";
import { Match } from "./entities/match.entity";
import {
  IContext,
  ISubscriptionContext,
} from "../utils/interfaces/context.interface";
import {
  ISubscriptionPayload,
  generateMatchDto,
  generateMatchInputDto,
} from "./dto/matchInputDto";

export class MatchResolver {
  @Authorized()
  @Mutation(() => Match)
  async generateMatch(
    @PubSub() pubSub: PubSubEngine,
    @Ctx() ctx: IContext,
    @Arg("data") data: generateMatchInputDto
  ): Promise<Match> {
    try {
      const match = await ctx.services.matchService.generateMatch(ctx, data);
      // const user = await ctx.services.matchService.getUserByPlayerId(
      //   data.opponentId,
      //   ctx
      // );
      // const subPayload = { id: user.id, isNewMatch: true };
      // await pubSub.publish("NEW_MATCH", subPayload);
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
  @Subscription({
    topics: "NEW_MATCH",
    filter: ({
      payload,
      args,
      context,
    }: {
      payload: ISubscriptionPayload;
      args: any;
      context: ISubscriptionContext;
    }) => {
      return payload.id === context.currentUser.id;
    },
  })
  messageSent(@Root() subPayload: ISubscriptionPayload): Boolean {
    return subPayload.isNewMatch;
  }
}
