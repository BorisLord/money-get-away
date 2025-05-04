import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsInt,
  IsPositive,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  restaurantId: number;
}
