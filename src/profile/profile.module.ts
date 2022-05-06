import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from '@app/profile/profile.entity';
import { ProfileController } from '@app/profile/profile.controller';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { ProfileService } from '@app/profile/profile.service';
import { AddressService } from '@app/address/address.service';
import { AddressEntity } from '@app/address/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity, AddressEntity])],
  controllers: [ProfileController],
  providers: [ProfileService, AddressService, AuthGuard],
})
export class ProfileModule {}
