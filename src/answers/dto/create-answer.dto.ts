import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateAnswerDto {
  @MaxLength(500)
  @IsNotEmpty()
  body: string;
}
