import {Injectable, NotFoundException} from '@nestjs/common';
import {CreatePostDto} from './dto/create-post.dto';
import {UpdatePostDto} from './dto/update-post.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Post} from "./entities/post.entity";
import {Repository} from "typeorm";
import {User} from "../users/entities/user.entity";
import {Goal} from "../goals/entities/goal.entity";

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Goal)
        private goalRepository: Repository<Goal>,
    ) {
    }

    async create(createPostDto: CreatePostDto): Promise<Post> {
        const {title, imageUrl, videoUrl, userId, goalId} = createPostDto;

        const user = await this.userRepository.findOne({
            where: {id: userId},
        });
        if (!user) {
            throw new NotFoundException(`User with id ${userId} not found`);
        }

        const goal = await this.goalRepository.findOne({
            where: {id: goalId},
        });
        if (!goal) {
            throw new NotFoundException(`Goal with id ${goalId} not found`);
        }

        const post = new Post(
            title,
            imageUrl,
            videoUrl,
            user,
            goal,
        );

        return await this.postRepository.save(post);
    }

    async findAll(): Promise<Post[]> {
        return await this.postRepository.find();
    }

    async findOne(id: string): Promise<Post> {
        const post = await this.postRepository.findOneBy({
            id: id,
        })
        if (!post) {
            throw new NotFoundException(`Post with id ${id} not found`);
        }
        return post;
    }

    async update(id: number, updatePostDto: UpdatePostDto) {
        return await this.postRepository.update(id, updatePostDto);
    }

    async remove(id: string): Promise<void> {
        const post = await this.postRepository.findOneBy({
            id: id
        })
        if (!post) {
            throw new NotFoundException(`Post with id ${id} not found`);
        }
        await this.postRepository.remove(post);
    }
}
