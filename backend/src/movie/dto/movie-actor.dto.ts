import {
   IsInt,
   IsOptional,
   IsPositive,
   IsString,
   MaxLength,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class MovieActorDto {
   @IsInt({ message: 'Actor ID must be an integer' })
   @IsPositive({ message: 'Actor ID must be a positive number' })
   @Type(() => Number)
   actorId: number;

   @IsOptional()
   @IsString()
   @MaxLength(255, { message: 'Character name must not exceed 255 characters' })
   @Transform(({ value }: { value: string }) =>
      typeof value === 'string' ? value.trim() : value,
   )
   character?: string;

   @IsOptional()
   @IsString()
   @MaxLength(50, { message: 'Role must not exceed 50 characters' })
   @Transform(({ value }: { value: string }) =>
      typeof value === 'string' ? value.trim() : value,
   )
   role?: string = 'actor';

   @IsOptional()
   @IsInt({ message: 'Order must be an integer' })
   @Type(() => Number)
   order?: number = 0;
}
