import {
   IsString,
   IsNotEmpty,
   IsOptional,
   IsDateString,
   MaxLength,
   IsArray,
   ArrayMaxSize,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateActorDto {
   @IsString()
   @IsNotEmpty()
   @MaxLength(100, { message: 'Name must not exceed 100 characters' })
   @Transform(({ value }: { value: string }) =>
      typeof value === 'string' ? value.trim() : value,
   )
   name: string;

   @IsOptional()
   @IsString()
   @MaxLength(5000, { message: 'Bio must not exceed 5000 characters' })
   @Transform(({ value }: { value: string }) =>
      typeof value === 'string' ? value.trim() : value,
   )
   bio?: string;

   @IsOptional()
   @IsDateString(
      {},
      { message: 'Birth date must be a valid date string (YYYY-MM-DD)' },
   )
   birthDate?: string;

   @IsOptional()
   @IsDateString(
      {},
      { message: 'Death date must be a valid date string (YYYY-MM-DD)' },
   )
   deathDate?: string;

   @IsOptional()
   @IsString()
   @MaxLength(100, { message: 'Nationality must not exceed 100 characters' })
   @Transform(({ value }: { value: string }) =>
      typeof value === 'string' ? value.trim() : value,
   )
   nationality?: string;

   @IsOptional()
   @IsArray()
   @ArrayMaxSize(10, { message: 'Cannot have more than 10 alternative names' })
   @IsString({ each: true })
   @MaxLength(100, {
      each: true,
      message: 'Each alternative name must not exceed 100 characters',
   })
   @Transform(({ value }: { value: string[] }) =>
      Array.isArray(value)
         ? value.map((name: string) => name?.trim()).filter(Boolean)
         : value,
   )
   called?: string[];
}
