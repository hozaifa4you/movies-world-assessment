import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/auth/guards/auth.guard';
import { RoleEnum } from 'src/database/schemas';
import { PaginationDto } from 'src/common/dots/pagination.dto';

@Controller('users')
@UseGuards(JwtGuard, RolesGuard)
@Roles(RoleEnum.Admin)
export class UserController {
   constructor(private readonly userService: UserService) {}

   @Get()
   public async findAll(@Query() pagination: PaginationDto) {
      return this.userService.findAll(pagination);
   }
}
