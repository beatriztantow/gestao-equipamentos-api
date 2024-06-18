import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Checkout } from './equipments/entities/checkout.entity';
import { Equipment } from './equipments/entities/equipment.entity';
import { EquipmentsModule } from './equipments/equipments.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Equipment, Checkout],
      synchronize: true,
    }),
    UsersModule,
    EquipmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
