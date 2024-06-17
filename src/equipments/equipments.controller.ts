import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EquipmentsService } from './equipments.service';
import { EquipmentDto } from './dto/equipment.dto';
import { Equipment } from './entities/equipment.entity';

@ApiTags('Equipments')
@Controller('equipments')
export class EquipmentsController {
  constructor(private readonly equipmentsService: EquipmentsService) {}

  @ApiOperation({
    description: 'Cria um novo equipamento.',
  })
  @Post()
  create(@Body() equipmentDto: EquipmentDto): Promise<Equipment> {
    return this.equipmentsService.create(equipmentDto);
  }

  @ApiOperation({
    description: 'Atualiza equipamento.',
  })
  @Put(':id')
  update(@Param('id') id: number, @Body() equipmentDto: EquipmentDto): Promise<boolean> {
    return this.equipmentsService.update(id, equipmentDto);
  }

  @ApiOperation({
    description: 'Remove equipamento.',
  })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<boolean> {
    return this.equipmentsService.remove(id);
  }

  @ApiOperation({
    description: 'Busca equipamento por id.',
  })
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Equipment> {
    return this.equipmentsService.findOne(id);
  }

  @ApiOperation({
    description: 'Busca todos os equipamentos.',
  })
  @Get()
  findAll(): Promise<Equipment[]> {
    return this.equipmentsService.findAll();
  }
}
