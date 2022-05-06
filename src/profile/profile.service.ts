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

  buildProfileResponse(
    user: UserEntity,
    profile: ProfileEntity,
  ): ProfileResponseInterface {
    return {
      address: { city: '', country: '', street: '' },
      name: profile.name,
      id: user.id,
    };
  }

  async getProfile(user: UserEntity): Promise<ProfileEntity> {
    return await this.profileRepository.findOne({
      user: user,
    });
  }
}
