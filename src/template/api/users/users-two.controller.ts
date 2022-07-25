import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/core/guards/firebase/public.decorator';
import { Role } from 'src/core/guards/roles/role.enum';
import { Roles } from 'src/core/guards/roles/roles.decorator';
import { ReadUserDto } from 'src/template/domain/entities/dto/read-user.dto';
import { UsersQuery } from 'src/template/domain/queries/user.query';

@ApiTags('Users')
@Controller({ path: 'users', version: '2' })
export class UsersTwoController {
  constructor(private readonly queryBus: QueryBus) {}

  @Public()
  @Get()
  @Roles(Role.Admin)
  @ApiOperation({
    summary:
      'Retorna todos os usuários cadastrados sem a necessidade de um token de acesso',
  })
  async getUsers(): Promise<ReadUserDto[]> {
    return this.queryBus.execute<UsersQuery, ReadUserDto[]>(new UsersQuery());
  }

  @Get('token')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @ApiOperation({
    summary:
      'Retorna todos os usuários cadastrados com a necessidade de um token de acesso',
  })
  async getUsersToken(): Promise<ReadUserDto[]> {
    return this.queryBus.execute<UsersQuery, ReadUserDto[]>(new UsersQuery());
  }
}
