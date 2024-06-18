import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CheckoutDto } from '../dto/checkout.dto';
import { Equipment } from './equipment.entity';

@Entity()
export class Checkout {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Equipment, (equipment) => equipment.checkout)
  equipment: Equipment;

  @ManyToOne(() => User, (user) => user.checkout)
  user: User;

  @Column()
  quantity: number;

  @Column()
  checkoutDate: Date;

  @Column({ nullable: true })
  returnDate: Date;

  static fromDTO(checkoutDto: CheckoutDto): Checkout {
    const checkout = new Checkout();
    checkout.equipment = new Equipment({ id: checkoutDto.equipmentId });
    checkout.user = new User({ id: checkoutDto.userId });
    checkout.quantity = checkoutDto.quantity;
    return checkout;
  }
}
