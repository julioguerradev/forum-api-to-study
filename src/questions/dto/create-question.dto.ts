import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @MaxLength(500)
  @IsNotEmpty()
  body: string;
}
