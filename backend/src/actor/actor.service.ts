import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { DB } from 'src/database/database.module';
import type { Database } from 'src/database/types';
import { actors } from 'src/database/schemas';
import type { PaginationQuery } from 'src/common/pipes/pagination.pipe';
import { count, asc, eq, ilike } from 'drizzle-orm';

@Injectable()
export class ActorService {
   constructor(@Inject(DB) private readonly db: Database) {}

   async create(createActorDto: CreateActorDto) {
      const returning = await this.db
         .insert(actors)
         .values(createActorDto)
         .returning();

      return returning[0];
   }

   async findAll(pagination: PaginationQuery) {
      const [totalResult] = await this.db
         .select({ count: count() })
         .from(actors);

      const total = totalResult.count;

      const data = await this.db
         .select()
         .from(actors)
         .orderBy(asc(actors.name))
         .limit(pagination.take)
         .offset(pagination.skip);

      const totalPages = Math.ceil(total / pagination.pageSize);
      const hasNextPage = pagination.page < totalPages;
      const hasPrevPage = pagination.page > 1;

      return {
         data,
         pagination: {
            page: pagination.page,
            pageSize: pagination.pageSize,
            total,
            totalPages,
            hasNextPage,
            hasPrevPage,
         },
      };
   }

   async findOne(id: number) {
      const [actor] = await this.db
         .select()
         .from(actors)
         .where(eq(actors.id, id));

      if (!actor) {
         throw new NotFoundException('Actor not found');
      }

      return actor;
   }

   async update(id: number, updateActorDto: UpdateActorDto) {
      const [updatedActor] = await this.db
         .update(actors)
         .set(updateActorDto)
         .where(eq(actors.id, id))
         .returning();

      if (!updatedActor) {
         throw new NotFoundException('Actor not found');
      }

      return updatedActor;
   }

   async remove(id: number) {
      const [deletedActor] = await this.db
         .delete(actors)
         .where(eq(actors.id, id))
         .returning();

      if (!deletedActor) {
         throw new NotFoundException('Actor not found');
      }
   }

   async search(query: string) {
      const data = await this.db
         .select({
            id: actors.id,
            name: actors.name,
            avatarUrl: actors.photoUrl,
         })
         .from(actors)
         .where(ilike(actors.name, `%${query}%`))
         .orderBy(asc(actors.name))
         .limit(10);

      return data;
   }
}
