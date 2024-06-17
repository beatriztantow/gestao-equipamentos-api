import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    description: 'Cria um novo usuário.',
  })
  @Post()
  create(@Body() userDto: UserDto): Promise<User> {
    return this.usersService.create(userDto);
  }

  @ApiOperation({
    description: 'Atualiza usuário.',
  })
  @Put(':id')
  update(@Param('id') id: number, @Body() userDto: UserDto): Promise<boolean> {
    return this.usersService.update(id, userDto);
  }

  @ApiOperation({
    description: 'Remove usuário.',
  })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<boolean> {
    return this.usersService.remove(id);
  }

  @ApiOperation({
    description: 'Busca usuário por id.',
  })
  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @ApiOperation({
    description: 'Busca todos os usuários.',
  })
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
