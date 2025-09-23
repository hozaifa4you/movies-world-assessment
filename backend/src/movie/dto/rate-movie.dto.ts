import {
   IsInt,
   IsOptional,
   IsPositive,
   IsString,
   Length,
   Max,
   Min,
} from 'class-validator';

export class RateMovieDto {
   @IsInt()
   @IsPositive()
   @Min(1)
   @Max(10)
   rating: number;

   @IsOptional()
   @IsString()
   @Length(5, 100)
   review?: string;
}
