import { Field, InputType } from "type-graphql";

@InputType()
export class TogglePlayerModeUpdateInputDto {
  @Field()
  isPlayer: boolean;
  @Field()
  battletag: string;
}

@InputType()
export class UpdateProfileInputDto {
  @Field()
  battletag: string;
}
export interface PlayerModeToBeChanged {
  isPlayer: boolean;
  userId: number;
}
