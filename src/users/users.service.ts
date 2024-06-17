import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(userDto: UserDto): Promise<User> {
    const user = User.fromDTO(userDto);
    await this.checkForDuplicates(user);
    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async update(id: number, userDto: UserDto): Promise<boolean> {
    const user = User.fromDTO(userDto);
    await this.checkForDuplicates(user, id);
    return (await this.usersRepository.update(id, user)).affected > 0;
  }

  async remove(id: number): Promise<boolean> {
    return (await this.usersRepository.delete(id)).affected > 0;
  }

  private async checkForDuplicates(user: User, id?: number): Promise<void> {
    const query = {};
    if (id) {
      query['id'] = Not(id);
    }

    if (
      await this.usersRepository.countBy({
        documentNumber: user.documentNumber,
        ...query,
      })
    ) {
      throw new ConflictException('Este número de documento já está em uso.');
    }

    if (
      await this.usersRepository.countBy({
        email: user.email,
        ...query,
      })
    ) {
      throw new ConflictException('Este e-mail já está em uso.');
    }
  }
}
