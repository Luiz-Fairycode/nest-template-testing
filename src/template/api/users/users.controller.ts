import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FirebaseAuthGuard } from 'src/core/guards/firebase/firebase-auth.guard';
import { Public } from 'src/core/guards/firebase/public.decorator';
import { PoliciesGuard } from 'src/core/guards/policies/policy.guard';
import { Role } from 'src/core/guards/roles/role.enum';
import { Roles } from 'src/core/guards/roles/roles.decorator';
import { RolesGuard } from 'src/core/guards/roles/roles.guard';
import { CreateUserCommand } from 'src/template/domain/commands/users/create-user.command';
import { CreateUserDto } from 'src/template/domain/entities/dto/create-user.dto';
import { ReadUserDto } from 'src/template/domain/entities/dto/read-user.dto';
import { UsersQuery } from 'src/template/domain/queries/user.query';

@ApiTags('Users')
@UseGuards(FirebaseAuthGuard, RolesGuard, PoliciesGuard)
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(
    private commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Public()
  @Get()
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

  @Public()
  @Post()
  @ApiOperation({
    summary: 'Cadastra um usuário sem a necessidade de um token de acesso',
  })
  @ApiBody({ type: CreateUserDto })
  async postUser(@Body() createUserDto: CreateUserDto): Promise<ReadUserDto> {
    await this.commandBus.execute(new CreateUserCommand(createUserDto));

    const readUserDto = new ReadUserDto();
    readUserDto.name = createUserDto.name;

    return readUserDto;
  }

  @Post('token')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Cadastra um usuário com a necessidade de um token de acesso',
  })
  @ApiBody({ type: CreateUserDto })
  async postUserToken(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ReadUserDto> {
    await this.commandBus.execute(new CreateUserCommand(createUserDto));

    const readUserDto = new ReadUserDto();
    readUserDto.name = createUserDto.name;

    return readUserDto;
  }
}
