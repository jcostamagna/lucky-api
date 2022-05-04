import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(): Promise<User[]> {
    return await this.userService.getUser();
  }

  @Post()
  async createUser(@Body('user') createUserDto: CreateUserDto): Promise<User> {
      return await this.userService.createUser(createUserDto);
  }
}
