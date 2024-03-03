import { IsNotEmpty } from 'class-validator';

export class GoogleAuthDto {
  @IsNotEmpty()
  access_token: string;
}
