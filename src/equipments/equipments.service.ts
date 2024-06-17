import { ConflictException, Injectable } from '@nestjs/common';
import { Equipment } from './entities/equipment.entity';
import { Not, Repository } from 'typeorm';
import { EquipmentDto } from './dto/equipment.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EquipmentsService {
  constructor(
    @InjectRepository(Equipment)
    private equipmentRepository: Repository<Equipment>,
  ) {}

  async create(equipmentDto: EquipmentDto): Promise<Equipment> {
    const equipment = Equipment.fromDTO(equipmentDto);
    await this.checkForDuplicates(equipment);
    return await this.equipmentRepository.save(equipment);
  }

  async findAll(): Promise<Equipment[]> {
    return this.equipmentRepository.find();
  }

  async findOne(id: number): Promise<Equipment> {
    return this.equipmentRepository.findOneBy({ id });
  }

  async update(id: number, equipmentDto: EquipmentDto): Promise<boolean> {
    const equipment = Equipment.fromDTO(equipmentDto);
    await this.checkForDuplicates(equipment, id);
    return (await this.equipmentRepository.update(id, equipment)).affected > 0;
  }

  async remove(id: number): Promise<boolean> {
    return (await this.equipmentRepository.delete(id)).affected > 0;
  }

  private async checkForDuplicates(equipment: Equipment, id?: number): Promise<void> {
    const query = {};
    if (id) {
      query['id'] = Not(id);
    }

    if (
      await this.equipmentRepository.countBy({
        name: equipment.name,
        ...query,
      })
    ) {
      throw new ConflictException('Este equipamento já está cadastrado.');
    }
  }
}
