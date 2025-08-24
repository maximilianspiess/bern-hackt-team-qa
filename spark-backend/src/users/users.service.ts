import {ConflictException, ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {GetUserDto} from "./dto/get-user.dto";
import {UserPayload} from "./auth/user-payload.model";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    let existingUser = await this.userRepository.findOne({
        where: {
          username: createUserDto.username
        },
        relations: ["account"]
    });

    if (existingUser != null) {
      throw new ConflictException(`User with username '${createUserDto.username}' already exists`);
    }

    const saltRounds = 10;
    const hash = await bcrypt.hash(createUserDto.password, saltRounds);

    let newUser = new User(createUserDto.username, hash);
    let createdUser = await this.userRepository.save(newUser);
    return GetUserDto.fromUser(createdUser);
  }

  async findAll() {
    let users = await this.userRepository.find({
      relations: ["account"]
    });
    return users.map(user => GetUserDto.fromUser(user));
  }

  findCurrent(currentUser: UserPayload) {
    return this.findOne(currentUser.id, currentUser);
  }

  async findOne(id: string, currentUser: UserPayload) {
    if (id !== currentUser.id){
      throw new ForbiddenException("You are not permitted to view this user.");
    }

    let user = await this.userRepository.findOne({
      where: {
        id: id
      },
      relations: ["account"]
    });

    if (user == null) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return GetUserDto.fromUser(user);
  }

  async remove(id: string, currentUser: UserPayload) {
    if (id !== currentUser.id){
      throw new ForbiddenException("You are not permitted to view this user.");
    }

    let user = await this.userRepository.findOneBy({
      id: id
    });

    if (user == null) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.remove(user);
  }
}
