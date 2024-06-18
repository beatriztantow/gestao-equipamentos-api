import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CheckoutDto } from './dto/checkout.dto';
import { Checkout } from './entities/checkout.entity';
import { EquipmentsService } from './equipments.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CheckoutService {
  constructor(
    private equipmentsService: EquipmentsService,
    private dataSource: DataSource,

    @InjectRepository(Checkout)
    private checkoutRepository: Repository<Checkout>,
  ) {}

  async create(checkoutDto: CheckoutDto): Promise<Checkout> {
    const checkout = Checkout.fromDTO(checkoutDto);
    checkout.checkoutDate = new Date();

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let aux: Checkout;
    try {
      await this.equipmentsService.checkout(checkout, queryRunner.manager);
      aux = await queryRunner.manager.save(checkout);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
    return aux;
  }

  async returnEquipment(checkoutId: number): Promise<Checkout> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let aux: Checkout;
    try {
      const checkout = await queryRunner.manager.findOne(Checkout, {
        where: { id: checkoutId },
        relations: ['user', 'equipment'],
      });
      if (!checkout) {
        throw new BadRequestException('A retirada não foi encontrada.');
      }
      if (checkout.returnDate) {
        throw new BadRequestException('A retirada já foi devolvida.');
      }
      checkout.returnDate = new Date();
      await this.equipmentsService.return(checkout, queryRunner.manager);
      aux = await queryRunner.manager.save(checkout);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
    return aux;
  }
}
