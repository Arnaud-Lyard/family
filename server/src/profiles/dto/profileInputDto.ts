import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateProfileDto {
  @Field()
  battletag: string;
  @Field()
  isPlayer: boolean;
  @Field()
  username: string;
  @Field()
  email: string;
}
export interface PlayerModeToBeChanged {
  isPlayer: boolean;
  userId: number;
}
