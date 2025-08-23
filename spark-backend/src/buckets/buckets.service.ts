import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {HabitBucket} from "./entity/habit-bucket.entity";
import {Repository} from "typeorm";
import {FriendBucket} from "./entity/friend-bucket.entity";
import {CreateFriendBucketDto} from "./dto/create-friend-bucket.dto";
import {User} from "../users/entities/user.entity";
import {AddToFriendBucketDto} from "./dto/add-to-friend-bucket.dto";
import {Habit} from "../habits/entities/habit.entity";
import {cosineSimilarity} from "../util/cosineSimilarity";

@Injectable()
export class BucketsService {
    constructor(
        @InjectRepository(HabitBucket)
        private habitBucketRepository: Repository<HabitBucket>,
        @InjectRepository(FriendBucket)
        private friendBucketRepository: Repository<FriendBucket>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Habit)
        private habitsRepository: Repository<Habit>
    ) {}
        private userRepository: Repository<User>,
        @InjectRepository(Habit)
        private habitRepository: Repository<Habit>,
    ) {
    }

    async createHabitBuckets(threshold = 0.75) {
        const habits = await this.habitRepository.find({relations: ['users']});
        const users = await this.userRepository.find({relations: ['habits']});

        // Clear old buckets
        const oldBuckets = await this.habitBucketRepository.find({relations: ['users', 'commonHabits']});
        await this.habitBucketRepository.remove(oldBuckets);

        const buckets: HabitBucket[] = [];

        for (const habit of habits) {
            let addedToBucket = false;

            for (const bucket of buckets) {
                let maxSim = 0
                for (const h of bucket.commonHabits) {
                    const sim = cosineSimilarity(habit.embedding, h.embedding)
                    if (sim > maxSim) maxSim = sim;
                }
                if (maxSim >= threshold) {
                    bucket.commonHabits.push(habit)
                    const habitUsers = users.filter(u => u.habits.some(h => h.id === habit.id));
                    bucket.users.push(...habitUsers);
                    addedToBucket = true;
                    break;
                }
            }

            if (!addedToBucket) {
                const bucket = this.habitBucketRepository.create({
                    commonHabits: [habit],
                    users: users.filter(u => u.habits.some(h => h.id === habit.id)),
                });
                buckets.push(bucket);
            }
        }

        // Remove duplicate users in each bucket
        for (const bucket of buckets) {
            bucket.users = Array.from(new Set(bucket.users.map(u => u?.id))).map(
                id => users.find(u => u.id === id),
            );
            await this.habitBucketRepository.save(bucket);
        }
    }

    async getCurrentUserFriendBuckets(id: string) {
        return await this.friendBucketRepository.find({
            where:{
                users:{
                    id: id
                }
            }
        });
    }

    async getCurrentUserHabitBuckets(id: string) {
        return await this.habitBucketRepository.find({
            where: {
                users: {
                    id: id
                }
            }
        });
    }

    async createFriendBucket(createDto: CreateFriendBucketDto, id: string) {
        let user = await this.userRepository.findOneBy({
            id: id
        });

        if (user == null){
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        let habit = await this.habitsRepository.findOneBy({
            id: createDto.habitId
        });
        if (habit == null) {
            throw new NotFoundException("Habit not found");
        }

        let friendBucket = new FriendBucket(habit, [user]);
        return this.friendBucketRepository.save(friendBucket);
    }


    async addUserToFriendBucket(addDto: AddToFriendBucketDto, id: string) {
        let user = await this.userRepository.findOneBy({
            id: id
        });

        if (user == null) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        let bucket = await this.friendBucketRepository.findOne({
            where: {
                inviteCode: addDto.inviteCode
            },
            relations: ["users"]
        });

        if (bucket == null){
            throw new NotFoundException(`Bucket with invite code ${addDto.inviteCode} not found`);
        }

        bucket.users.push(user);
        return this.friendBucketRepository.save(bucket);

    }
}
