import { Module } from '@nestjs/common';
import { EquipmentsService } from './equipments.service';
import { EquipmentsController } from './equipments.controller';
import { Equipment } from './entities/equipment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Checkout } from './entities/checkout.entity';
import { CheckoutService } from './checkout.service';

@Module({
  imports: [TypeOrmModule.forFeature([Equipment, Checkout])],
  providers: [EquipmentsService, CheckoutService],
  controllers: [EquipmentsController],
  exports: [EquipmentsService, CheckoutService],
})
export class EquipmentsModule {}
