import { IsDate, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class generateMatchInputDto {
  @Field()
  @IsString()
  opponentId: string;
  @Field()
  @IsDate()
  date: Date;
}
