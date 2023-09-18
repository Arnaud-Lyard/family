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
import { MatchService } from "./match.service";
import { ContextType, SubScriptionContextType } from "..";
import {
  ISubscriptionPayload,
  generateMatchInputDto,
} from "./dto/matchInputDto";
import { UserService } from "../users/user.service";

export class MatchResolver {
  @Authorized()
  @Mutation(() => Match)
  async generateMatch(
    @PubSub() pubSub: PubSubEngine,
    @Ctx() ctx: ContextType,
    @Arg("data") data: generateMatchInputDto
  ): Promise<Match> {
    try {
      const match = await MatchService.generateMatch(ctx, data);
      const user = await UserService.getUserByPlayerId(data.opponentId);
      const subPayload = { id: user.id, isNewMatch: true };
      await pubSub.publish("NEW_MATCH", subPayload);
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
      context: SubScriptionContextType;
    }) => {
      return payload.id === context.currentUser.id;
    },
  })
  messageSent(@Root() subPayload: ISubscriptionPayload): Boolean {
    return subPayload.isNewMatch;
  }
}
