import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import {CreatePostDto} from './dto/create-post.dto';
import {UpdatePostDto} from './dto/update-post.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Post} from "./entities/post.entity";
import {Repository} from "typeorm";
import {User} from "../users/entities/user.entity";
import {Goal} from "../goals/entities/goal.entity";
import {UserPayload} from "../users/auth/user-payload.model";

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

    async create(createPostDto: CreatePostDto, currentUser: UserPayload): Promise<Post> {
        const {title, imageUrl, videoUrl, goalId} = createPostDto;

        const user = await this.userRepository.findOne({
            where: {id: currentUser.id},
        });

        if (!user) {
            throw new NotFoundException(`User with id ${currentUser.id} not found`);
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

        return this.postRepository.save(post);
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

    async update(updatePostDto: UpdatePostDto, currentUser: UserPayload): Promise<Post> {
        const post = await this.findOne(currentUser.id);

        if (post.User.id !== currentUser.id) {
            throw new ForbiddenException('You can only update your own posts');
        }
        Object.assign(post, updatePostDto);
        return this.postRepository.save(post);
    }

    async remove(id: string, currentUser: UserPayload): Promise<void> {
        const post = await this.findOne(id);

        if (post.User.id !== currentUser.id) {
            throw new ForbiddenException('You can only delete your own posts');
        }
        await this.postRepository.remove(post);
    }
}
