import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressEntity } from '@app/address/address.entity';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { CityEntity } from '@app/address/city.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {}

  async createAddress(createUserDto: CreateUserDto) {
    const city = await this.cityRepository.findOne(createUserDto.cityId);

    if (!city) {
      throw new HttpException(
        'cityId is not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newAddress = new AddressEntity();
    newAddress.street = createUserDto.address;
    newAddress.city = city;
    return await this.addressRepository.save(newAddress);
  }
}
