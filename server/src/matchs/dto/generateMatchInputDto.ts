import { Field, InputType } from "type-graphql";

@InputType()
export class generateMatchInputDto {
  @Field()
  opponentId: string;
}
