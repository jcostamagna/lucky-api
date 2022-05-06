import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@app/user/decorators/user.decorator';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { ProfileService } from '@app/profile/profile.service';
import { ProfileResponseInterface } from '@app/profile/types/profileResponse.interface';
import { UserEntity } from '@app/user/user.entity';

@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('profile')
  @UseGuards(AuthGuard)
  async getProfile(
    @User() user: UserEntity,
  ): Promise<ProfileResponseInterface> {
    const profile = this.profileService.getProfile(user);

    return this.profileService.buildProfileResponse(user, await profile);
  }
}
