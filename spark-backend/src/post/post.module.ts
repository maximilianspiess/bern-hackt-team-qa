import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/entities/user.entity";
import {Post} from "./entities/post.entity";
import {Goal} from "../goals/entities/goal.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Post, User, Goal])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
