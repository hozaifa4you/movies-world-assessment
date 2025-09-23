import {
   IsString,
   IsNotEmpty,
   IsOptional,
   IsDateString,
   IsUrl,
   MaxLength,
   IsArray,
   IsPositive,
   IsEnum,
   Min,
   Max,
   IsNumber,
   ArrayNotEmpty,
   IsInt,
   ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { MovieActorDto } from './movie-actor.dto';

// Movie status enum matching the database
export enum MovieStatus {
   ARCHIVED = 'archived',
   UPCOMING = 'upcoming',
   POST_PRODUCTION = 'post-production',
   RELEASED = 'released',
   DRAFT = 'draft',
   IN_PRODUCTION = 'in-production',
}

export class CreateMovieDto {
   @IsString()
   @IsNotEmpty()
   @MaxLength(255, { message: 'Title must not exceed 255 characters' })
   @Transform(({ value }: { value: string }) =>
      typeof value === 'string' ? value.trim() : value,
   )
   title: string;

   @IsOptional()
   @IsString()
   @MaxLength(5000, { message: 'Description must not exceed 5000 characters' })
   @Transform(({ value }: { value: string }) =>
      typeof value === 'string' ? value.trim() : value,
   )
   description?: string;

   @IsOptional()
   @IsString()
   @MaxLength(500, {
      message: 'Short description must not exceed 500 characters',
   })
   @Transform(({ value }: { value: string }) =>
      typeof value === 'string' ? value.trim() : value,
   )
   shortDescription?: string;

   @IsString()
   @IsNotEmpty()
   @MaxLength(100, { message: 'Director name must not exceed 100 characters' })
   @Transform(({ value }: { value: string }) =>
      typeof value === 'string' ? value.trim() : value,
   )
   director: string;

   @IsOptional()
   @IsDateString(
      {},
      { message: 'Release date must be a valid date string (YYYY-MM-DD)' },
   )
   releaseDate?: string;

   @IsArray()
   @ArrayNotEmpty({ message: 'Genre array cannot be empty if provided' })
   @IsString({ each: true, message: 'Each genre must be a string' })
   genre: string[];

   @IsOptional()
   @IsUrl({}, { message: 'Poster URL must be a valid URL' })
   @MaxLength(500, { message: 'Poster URL must not exceed 500 characters' })
   posterUrl?: string;

   @IsOptional()
   @IsUrl({}, { message: 'Video URL must be a valid URL' })
   @MaxLength(500, { message: 'Video URL must not exceed 500 characters' })
   videoUrl?: string;

   @IsOptional()
   @IsUrl({}, { message: 'Trailer URL must be a valid URL' })
   @MaxLength(500, { message: 'Trailer URL must not exceed 500 characters' })
   trailerUrl?: string;

   @IsOptional()
   @IsInt({ message: 'Duration must be an integer' })
   @IsPositive({ message: 'Duration must be a positive number' })
   @Type(() => Number)
   duration?: number;

   @IsOptional()
   @IsString()
   @MaxLength(50, { message: 'Language must not exceed 50 characters' })
   @Transform(({ value }: { value: string }) =>
      typeof value === 'string' ? value.trim() : value,
   )
   language?: string = 'English';

   @IsOptional()
   @IsString()
   @MaxLength(100, { message: 'Country must not exceed 100 characters' })
   @Transform(({ value }: { value: string }) =>
      typeof value === 'string' ? value.trim() : value,
   )
   country?: string;

   @IsOptional()
   @IsNumber(
      { maxDecimalPlaces: 2 },
      { message: 'Budget must be a decimal with 2 decimal places' },
   )
   @Min(0, { message: 'Budget must be at least 0' })
   budget?: number;

   @IsOptional()
   @IsNumber(
      { maxDecimalPlaces: 2 },
      { message: 'Revenue must be a decimal with 2 decimal places' },
   )
   @Min(0, { message: 'Revenue must be at least 0' })
   revenue?: number;

   @IsOptional()
   @IsNumber(
      { maxDecimalPlaces: 1 },
      { message: 'IMDb rating must be a decimal with 1 decimal place' },
   )
   @Min(0.0, { message: 'IMDb rating must be at least 0.0' })
   @Max(10.0, { message: 'IMDb rating must not exceed 10.0' })
   imdbRating?: number;

   @IsOptional()
   @IsString()
   @MaxLength(20, { message: 'IMDb ID must not exceed 20 characters' })
   @Transform(({ value }: { value: string }) =>
      typeof value === 'string' ? value.trim() : value,
   )
   imdbId?: string;

   @IsOptional()
   @IsEnum(MovieStatus, { message: 'Status must be a valid movie status' })
   status?: MovieStatus = MovieStatus.DRAFT;

   // Optional actor details for the many-to-many relationship
   @IsOptional()
   @IsArray()
   @ValidateNested({ each: true })
   @Type(() => MovieActorDto)
   actors?: MovieActorDto[];
}
