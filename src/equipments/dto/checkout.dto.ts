import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CheckoutDto {
  @IsNumber()
  @IsNotEmpty({ message: 'O ID do equipamento é obrigatório.' })
  @ApiProperty({ example: 1, description: 'ID do equipamento' })
  equipmentId: number;

  @IsNumber()
  @IsNotEmpty({ message: 'O ID do usuário é obrigatório.' })
  @ApiProperty({ example: 1, description: 'ID do usuário' })
  userId: number;

  @IsNumber()
  @IsNotEmpty({ message: 'A quantidade do equipamento é obrigatória.' })
  @ApiProperty({
    example: 1,
    description: 'Quantidade do equipamento a ser retirado.',
  })
  @Min(1, { message: 'A quantidade mínima é 1.' })
  quantity: number;
}
