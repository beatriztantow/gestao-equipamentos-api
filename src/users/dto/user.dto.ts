import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsDocument } from 'src/decorators/is-document.decorator';

export class UserDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @ApiProperty({ example: 'Fulano', description: 'Nome do usuário' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'O número do documento é obrigatório.' })
  @ApiProperty({ example: '12345678900', description: 'Documento do usuário' })
  @IsDocument({ message: 'Número de documento inválido.' })
  documentNumber: string;

  @IsEmail({}, { message: 'E-mail inválido.' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  @ApiProperty({ example: 'email@email.com', description: 'E-mail do usuário' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @ApiProperty({ example: 'senha123', description: 'Senha do usuário' })
  password: string;
}
