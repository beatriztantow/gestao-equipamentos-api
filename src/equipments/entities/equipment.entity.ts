import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { EquipmentDto } from '../dto/equipment.dto';

@Entity()
@Unique(['name'])
export class Equipment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  quantity: number;

  static fromDTO(equipmentDto: EquipmentDto): Equipment {
    const user = new Equipment();
    Object.assign(user, equipmentDto);
    return user;
  }
}
