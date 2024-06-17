import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { IsDocument } from 'src/decorators/is-document.decorator';

export class EquipmentDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @ApiProperty({ example: 'Luva', description: 'Nome do equipamento' })
  name: string;

  @IsNumber()
  @IsNotEmpty({ message: 'A quantidade é obrigatória.' })
  @ApiProperty({ example: 0, description: 'Quantidade do equipamento' })
  @Min(0, { message: 'A quantidade deve ser positiva.' })
  quantity: number;
}
