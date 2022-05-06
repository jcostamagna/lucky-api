import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/config';
import { UserResponseInterface } from './types/userResponse.interface';
import { LoginUserDto } from './dto/loginUser.dto';
import { compare } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUser(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne(id);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByUsername = await this.userRepository.findOne({
      username: createUserDto.username,
    });

    if (userByUsername) {
      throw new HttpException(
        'Username is taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    return await this.userRepository.save(newUser);
  }

  generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        username: user.username,
      },
      JWT_SECRET,
    );
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const userByUsername = await this.userRepository.findOne({
      username: loginUserDto.username,
    });

    if (!userByUsername) {
      throw new HttpException(
        'Username does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isPasswordCorrect = await compare(
      loginUserDto.password,
      userByUsername.password,
    );

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Username or password are not correct',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    delete userByUsername.password;
    return userByUsername;
  }
}
