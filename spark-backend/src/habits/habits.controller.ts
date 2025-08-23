import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException} from '@nestjs/common';
import {HabitsService} from './habits.service';
import {CreateHabitDto} from './dto/create-habit.dto';
import {UpdateHabitDto} from './dto/update-habit.dto';
import {JwtAuthGuard} from "../users/auth/jwt-auth.guard";
import {CurrentUser} from "../users/auth/user.decorator";
import {UserPayload} from "../users/auth/user-payload.model";

@Controller('habits')
export class HabitsController {
    constructor(
        private readonly habitsService: HabitsService
    ) {
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createHabitDto: CreateHabitDto, @CurrentUser() user: UserPayload) {
        if (createHabitDto.userId !== user.id) {
            throw new BadRequestException("User in habit must match logged in user");
        }
        return this.habitsService.create(createHabitDto, user);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@CurrentUser() currentUser: UserPayload) {
        return this.habitsService.findAll(currentUser);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string, @CurrentUser() currentUser: UserPayload) {
        return this.habitsService.findOne(id, currentUser);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string,
           @Body() updateHabitDto: UpdateHabitDto,
           @CurrentUser() currentUser: UserPayload) {
        return this.habitsService.update(id, updateHabitDto, currentUser);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string, @CurrentUser() currentUser: UserPayload) {
        return this.habitsService.remove(id, currentUser);
    }
}
