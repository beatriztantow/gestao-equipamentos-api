import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { EquipmentDto } from '../dto/equipment.dto';
import { Checkout } from './checkout.entity';

@Entity()
@Unique(['name'])
export class Equipment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @OneToMany(() => Checkout, (checkout) => checkout.equipment)
  checkout: Checkout[];

  constructor(partial?: Partial<Equipment>) {
    Object.assign(this, partial);
  }

  static fromDTO(equipmentDto: EquipmentDto): Equipment {
    const equipment = new Equipment();
    Object.assign(equipment, equipmentDto);
    return equipment;
  }
}
