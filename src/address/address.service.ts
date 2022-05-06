import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressEntity } from '@app/address/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
  ) {}

  async getAddress(id: AddressEntity): Promise<AddressEntity> {
    return await this.addressRepository.query(
      `SELECT * FROM address WHERE "id"=${id}`,
    );
  }
}
