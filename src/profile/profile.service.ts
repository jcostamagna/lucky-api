import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@app/user/user.entity';
import { ProfileResponseInterface } from '@app/profile/types/profileResponse.interface';
import { ProfileEntity } from '@app/profile/profile.entity';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { AddressEntity } from '@app/address/address.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
  ) {}

  async getProfile(user: UserEntity): Promise<ProfileEntity> {
    return await this.profileRepository.findOne({
      user: user,
    });
  }

  async createProfile(
    createUserDto: CreateUserDto,
    user: UserEntity,
    address: AddressEntity,
  ) {
    const newProfile = new ProfileEntity();
    Object.assign(newProfile, createUserDto);
    newProfile.user = user;
    newProfile.address = address;
    return await this.profileRepository.save(newProfile);
  }

  buildProfileResponse(
    user: UserEntity,
    profile: ProfileEntity,
  ): ProfileResponseInterface {
    console.log('adress', profile.address);
    const address = profile.address;
    const city = address.city;
    const country = city.country;

    return {
      id: user.id,
      name: profile.name,
      address: {
        city: city.name,
        country: country.name,
        street: address.street,
      },
    };
  }
}
