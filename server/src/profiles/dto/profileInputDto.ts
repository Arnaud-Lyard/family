import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateProfileInputDto {
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
