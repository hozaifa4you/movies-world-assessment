import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { count, eq } from 'drizzle-orm';
import { SignupDTO } from '../auth/dtos/signup.dto';
import { DB } from 'src/database/database.module';
import type { Database } from 'src/database/types';
import { PaginationDto } from 'src/common/dots/pagination.dto';
import { Role, users } from 'src/database/schemas';

@Injectable()
export class UserService {
   constructor(@Inject(DB) private readonly db: Database) {}

   public async findAll(pagination: PaginationDto) {
      const [data, totalCount] = await Promise.all([
         this.db.query.users.findMany({
            columns: {
               password: false,
            },
            limit: pagination.take,
            offset: pagination.skip,
         }),
         this.db.select({ count: count() }).from(users),
      ]);

      const total = totalCount[0].count;
      const totalPages = Math.ceil(total / pagination.pageSize!);

      return {
         data,
         pagination: {
            page: pagination.page,
            pageSize: pagination.pageSize,
            total,
            totalPages,
            hasNext: pagination.page! < totalPages,
            hasPrev: pagination.page! > 1,
         },
      };
   }

   public async createUser(createUserDto: SignupDTO, role: Role) {
      const existingUser = await this.findUserByEmail(createUserDto.email);
      if (existingUser) {
         throw new BadRequestException('User already exist with the email');
      }

      const hashedPassword = await argon2.hash(createUserDto.password);
      createUserDto.password = hashedPassword;

      const returning = await this.db
         .insert(users)
         .values({ ...createUserDto, role })
         .returning();

      return returning[0];
   }

   public async findUserByEmail(email: string) {
      return this.db.query.users.findFirst({
         where: eq(users.email, email),
      });
   }

   public async findUserById(userId: number) {
      return this.db.query.users.findFirst({
         where: eq(users.id, userId),
      });
   }
}
