import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { UserDto } from '../dto/user.dto';

@Entity()
@Unique(['documentNumber', 'email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  documentNumber: string;

  @Column()
  email: string;

  @Column()
  password: string;

  static fromDTO(userDto: UserDto): User {
    const user = new User();
    Object.assign(user, userDto);
    return user;
  }
}
