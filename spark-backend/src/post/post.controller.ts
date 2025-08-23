import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {PostService} from './post.service';
import {CreatePostDto} from './dto/create-post.dto';
import {UpdatePostDto} from './dto/update-post.dto';
import {JwtAuthGuard} from "../users/auth/jwt-auth.guard";
import {CurrentUser} from "../users/auth/user.decorator";
import {UserPayload} from "../users/auth/user-payload.model";

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createPostDto: CreatePostDto, @CurrentUser() user: UserPayload) {
        return this.postService.create(createPostDto, user);
    }

    @Get()
    async findAll() {
        return this.postService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string){
        return this.postService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(
        @Body() updatePostDto: UpdatePostDto,
        @CurrentUser() user: UserPayload,
    ) {
        return this.postService.update(updatePostDto, user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string, @CurrentUser() user: UserPayload): Promise<void> {
        return this.postService.remove(id, user);
    }
}
