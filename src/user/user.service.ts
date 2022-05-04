import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './user.entity';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/config';
import { UserResponseInterface } from './types/userResponse.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) 
        private readonly userRepository: Repository<User>
    ) {}

    async getUser(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const newUser = new User();
        Object.assign(newUser, createUserDto);
        console.log('newUser', newUser);
        //this.userRepository.query('');
        return await this.userRepository.save(newUser);
    }

    generateJwt(user: User): string {
        return sign({
            id: user.id,
            username: user.username,
        }, JWT_SECRET);
    }

    buildUserResponse(user: User): UserResponseInterface {
        return {
            user: {
                ...user,
                token: this.generateJwt(user)
            }
        }
    }
}
