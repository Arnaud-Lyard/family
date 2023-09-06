import { Field, InputType } from "type-graphql";

@InputType()
export class TogglePlayerModeInputDto {
  @Field()
  isPlayer: boolean;
}

export interface PlayerModeToBeChanged {
  isPlayer: boolean;
  userId: number;
}
