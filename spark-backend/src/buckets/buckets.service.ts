import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {HabitBucket} from "./entity/habit-bucket.entity";
import {Repository} from "typeorm";
import {FriendBucket} from "./entity/friend-bucket.entity";
import {CreateFriendBucketDto} from "./dto/create-friend-bucket.dto";
import {User} from "../users/entities/user.entity";
import {AddToFriendBucketDto} from "./dto/add-to-friend-bucket.dto";

@Injectable()
export class BucketsService {
    constructor(
        @InjectRepository(HabitBucket)
        private habitBucketRepository: Repository<HabitBucket>,
        @InjectRepository(FriendBucket)
        private friendBucketRepository: Repository<FriendBucket>,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

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

        let friendBucket = new FriendBucket(createDto.habitId, [user]);
        return this.friendBucketRepository.save(friendBucket);
    }


    async addUserToFriendBucket(addDto: AddToFriendBucketDto, id: string) {
        let user = await this.userRepository.findOneBy({
            id: id
        });

        if (user == null) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        let bucket = await this.friendBucketRepository.findOneBy({
            inviteCode: addDto.inviteCode
        });

        if (bucket == null){
            throw new NotFoundException(`Bucket with invite code ${addDto.inviteCode} not found`);
        }

        bucket.users.push(user);
        return this.friendBucketRepository.save(bucket);

    }
}
