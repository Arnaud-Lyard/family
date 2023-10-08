import { Loaded } from "@mikro-orm/core";
import { IsDate, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";
import { Player } from "../../players/entities/player.entity";

@InputType()
export class generateMatchInputDto {
  @Field()
  @IsString()
  opponentId: string;
  @Field()
  @IsDate()
  date: Date;
}

export interface ISubscriptionPayload {
  id: string;
  isNewMatch: boolean;
}
@InputType()
export class generateMatchDto {
  @Field()
  opponent: Player;
  @Field()
  date: Date;
  @Field()
  user: string;
}
