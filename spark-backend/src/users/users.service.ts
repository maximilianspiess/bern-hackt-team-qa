import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {GetUserDto} from "./dto/get-user.dto";

@Injectable()
export class UsersService {
  constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    let existingUser = await this.userRepository.find({
      where: {
        username: createUserDto.username
      }
    });

    if (existingUser != null) {
      throw new HttpException("User with that username already exists", HttpStatus.CONFLICT);
    }
    let newUser = new User(createUserDto.username, createUserDto.password);
    let createdUser = await this.userRepository.save(newUser);
    return GetUserDto.fromUser(createdUser);
  }

  async findAll() {
    let users = await this.userRepository.find();
    return users.map(user => GetUserDto.fromUser(user));
  }

  async findOne(id: string) {
    let user = await this.userRepository.findOneBy({
      id: id
    });

    if (user == null) {
      throw new HttpException(`User with id ${id} not found`, HttpStatus.NOT_FOUND);
    }

    return GetUserDto.fromUser(user);
  }

  async remove(id: string) {
    let user = await this.userRepository.findOneBy({
      id: id
    });

    if (user == null) {
      throw new HttpException(`User with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }

    await this.userRepository.remove(user);
  }
}
