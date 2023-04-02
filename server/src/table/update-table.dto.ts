import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTableDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
