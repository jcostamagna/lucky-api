import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from '@app/profile/profile.entity';
import { ProfileController } from '@app/profile/profile.controller';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { ProfileService } from '@app/profile/profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity])],
  controllers: [ProfileController],
  providers: [ProfileService, AuthGuard],
})
export class ProfileModule {}
