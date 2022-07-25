import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { User } from '../../entities/user.entity';
import { CreateUserCommand } from './create-user.command';
import { Connection } from 'typeorm';
import { Photo } from '../../entities/photo.entity';
import { UserRepository } from 'src/template/infra/data/repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseCommandHandler } from 'src/core/domainObjects/command.handler';
import { IUserRepository } from '../../repository/user-repository.interface';
@CommandHandler(CreateUserCommand)
export class CreateUserHandler
  extends BaseCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: IUserRepository,
    private connection: Connection,
    private publisher: EventPublisher,
  ) {
    super();
  }

  async execute({ createUserDto }: CreateUserCommand) {
    const { name, age, urlPhoto } = createUserDto;

    // this.AddError('erro de teste');

    this.CheckErrors();

    const user = new User(name, age);
    user.addPhoto(new Photo(urlPhoto));

    const userEvent = await this.publisher.mergeObjectContext(
      await this.userRepository.saveUser(user),
    );

    // DISPARA O(S) EVENTO(S)
    userEvent.commit();
  }
}
