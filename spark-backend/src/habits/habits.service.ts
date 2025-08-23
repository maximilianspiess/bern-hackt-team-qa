import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateHabitDto} from './dto/create-habit.dto';
import {UpdateHabitDto} from './dto/update-habit.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Habit} from "./entities/habit.entity";
import {User} from "../users/entities/user.entity";
import {Goal} from "../goals/entities/goal.entity";
import {HabitDto} from "./dto/habit.dto";
import {EmbeddingsService} from "../util/embeddings/embeddings.service";

@Injectable()
export class HabitsService {
    constructor(
        @InjectRepository(Habit)
        private habitRepository: Repository<Habit>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(User)
        private goalRepository: Repository<Goal>,
        private embeddingsService: EmbeddingsService
    ) {
    }

    async create(createHabitDto: CreateHabitDto) {
        const user = await this.userRepository.findOneBy({
            id: createHabitDto.userId
        });
        if (user == null) {
            throw new NotFoundException("User not found");
        }

        const goals = await Promise.all(createHabitDto.goalIds.map(async goalId => {
            const goal = await this.goalRepository.findOneBy({
                id: goalId
            })
            if (goal == null) {
                throw new NotFoundException("Goal not found");
            }
            return goal;
        }));

        const embedding = await this.embeddingsService.getEmbedding(createHabitDto.title)

        const habit = new Habit(
            createHabitDto.title,
            user,
            goals,
            createHabitDto.icon,
            embedding,
            createHabitDto.categories
        );

        const newHabit = await this.habitRepository.save(habit);

        return HabitDto.fromEntity(newHabit);
    }

    async findAll() {
        return (await this.habitRepository
            .find({relations: ["user", "goals", "goals.habit"]}))
            .map(habit => HabitDto.fromEntity(habit));
    }

    async findOne(id: string) {
        const habit = await this.habitRepository.findOneBy({
            id: id
        })
        if (habit == null) {
            throw new NotFoundException(`Habit with id '${id}' not found`);
        }

        return HabitDto.fromEntity(habit);
    }

    async update(id: string, updateHabitDto: UpdateHabitDto) {
        await this.habitRepository.update(id, updateHabitDto);
        return this.habitRepository.findOneByOrFail({
            id: id
        })
    }

    async remove(id: string) {
        const habit = await this.habitRepository.findOneBy({
            id: id
        });
        if (habit == null) {
            throw new NotFoundException("Habit not found");
        }

        await this.habitRepository.remove(habit);
    }
}
