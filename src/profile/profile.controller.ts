import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from '@app/user/decorators/user.decorator';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { ProfileService } from '@app/profile/profile.service';
import { ProfileResponseInterface } from '@app/profile/types/profileResponse.interface';
import { UserEntity } from '@app/user/user.entity';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { UserResponseInterface } from '@app/user/types/userResponse.interface';
import { UserService } from '@app/user/user.service';
import { AddressService } from '@app/address/address.service';

@Controller()
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly userService: UserService,
    private readonly addressService: AddressService,
  ) {}

  @Get('profile')
  @UseGuards(AuthGuard)
  async getProfile(
    @User() user: UserEntity,
  ): Promise<ProfileResponseInterface> {
    const profile = await this.profileService.getProfile(user);

    return this.profileService.buildProfileResponse(user, profile);
  }

  @Post('profile')
  @UsePipes(new ValidationPipe())
  async createProfile(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const address = await this.addressService.createAddress(createUserDto);

    const user = await this.userService.createUser(createUserDto);

    const profile = this.profileService.createProfile(
      createUserDto,
      user,
      address,
    );

    return this.userService.buildUserResponse(user);
  }
}
