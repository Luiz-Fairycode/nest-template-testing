import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from 'src/template/domain/commands/users/create-user.handler';
import { UserCreatedHandler } from 'src/template/domain/events/email/user-created.handler';
import { UsersQueryHandler } from 'src/template/domain/queries/user.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from 'src/template/api/users/users.controller';
import { UsersTwoController } from 'src/template/api/users/users-two.controller';
import { UserRepository } from '../data/repository/user.repository';

export const CommandHandlers = [CreateUserHandler];
export const QueryHandlers = [UsersQueryHandler];
export const EventHandlers = [UserCreatedHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([UserRepository]),
    ConfigModule,
  ],
  exports: [TypeOrmModule],
  controllers: [UsersController, UsersTwoController],
  providers: [...CommandHandlers, ...QueryHandlers, ...EventHandlers],
})
export class UsersModule {}
