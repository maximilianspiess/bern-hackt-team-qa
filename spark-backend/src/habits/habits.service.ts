import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Habit } from "./entities/habit.entity";
import { User } from "../users/entities/user.entity";
import { Goal } from "../goals/entities/goal.entity";

@Injectable()
export class HabitsService {
  constructor(
      @InjectRepository(Habit)
      private habitRepository: Repository<Habit>,
      @InjectRepository(User)
      private userRepository: Repository<User>,
      @InjectRepository(User)
      private goalRepository: Repository<Goal>
  ) {}

  async create(createHabitDto: CreateHabitDto) {
    const user = await this.userRepository.findOneBy({
      id: createHabitDto.userId
    });
    if (user == null) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    const goals = await Promise.all(createHabitDto.goalIds.map(async goalId => {
      const goal = await this.goalRepository.findOneBy({
        id: goalId
      })
      if (goal == null) {
        throw new HttpException("Goal not found", HttpStatus.NOT_FOUND);
      }
      return goal;
    }));

    const habit = new Habit(
        createHabitDto.title,
        user,
        goals,
        createHabitDto.icon
    );

    return await this.habitRepository.save(habit);
  }

  async findAll() {
    return await this.habitRepository.find();
  }

  async findOne(id: string) {
    const habit = await this.habitRepository.findOneBy({
      id: id
    })
    if (habit == null) {
      throw new HttpException("Habit not found", HttpStatus.NOT_FOUND);
    }

    return habit;
  }

  async update(id: string, updateHabitDto: UpdateHabitDto) {
    return await this.habitRepository.update(id, updateHabitDto);
  }

  async remove(id: string) {
    const habit = await this.habitRepository.findOneBy({
      id: id
    });
    if (habit == null) {
      throw new HttpException("Habit not found", HttpStatus.NOT_FOUND);
    }

    await this.habitRepository.remove(habit);
  }
}
