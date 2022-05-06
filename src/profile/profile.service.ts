import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@app/user/user.entity';
import { ProfileResponseInterface } from '@app/profile/types/profileResponse.interface';
import { ProfileEntity } from '@app/profile/profile.entity';

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

  buildProfileResponse(
    user: UserEntity,
    profile: ProfileEntity,
  ): ProfileResponseInterface {
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
