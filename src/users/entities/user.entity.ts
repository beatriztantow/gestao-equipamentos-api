import { Checkout } from 'src/equipments/entities/checkout.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
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

  @OneToMany(() => Checkout, (checkout) => checkout.user)
  checkout: Checkout[];

  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }

  static fromDTO(userDto: UserDto): User {
    const user = new User();
    Object.assign(user, userDto);
    return user;
  }
}
