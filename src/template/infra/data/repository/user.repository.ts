import { User } from 'src/template/domain/entities/user.entity';
import { IUserRepository } from 'src/template/domain/repository/user-repository.interface';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository
  extends Repository<User>
  implements IUserRepository
{
  async findAll(): Promise<User[]> {
    return await this.find({ relations: ['photos'] });
  }

  async saveUser(user: User): Promise<User> {
    return await this.save(user);
  }
}
