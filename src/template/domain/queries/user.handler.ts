/* eslint-disable prettier/prettier */
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/template/infra/data/repository/user.repository';
import { PhotoDto, ReadUserDto } from '../entities/dto/read-user.dto';
import { IUserRepository } from '../repository/user-repository.interface';
import { UsersQuery } from './user.query';

@QueryHandler(UsersQuery)
export class UsersQueryHandler implements IQueryHandler<UsersQuery> {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: IUserRepository) { }

  async execute(): Promise<ReadUserDto[]> {
    const users = await this.userRepository.findAll();
    return users.map(user => <ReadUserDto>{
      id: user.getId(),
      name: user.getName(),
      creationDate: user.getCreationDateTime(),
      creationProgram: user.getCreationProgram(),
      photos: user.getPhotos().map(p => <PhotoDto>{ url: p.getUrl() })
    });
  }
}
