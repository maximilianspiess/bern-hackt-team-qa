import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { GoalsService } from './goals.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import type { UpdateGoalDto } from './dto/update-goal.dto';
import {JwtAuthGuard} from "../users/auth/jwt-auth.guard";
import {CurrentUser} from "../users/auth/user.decorator";
import {UserPayload} from "../users/auth/user-payload.model";

@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createGoalDto: CreateGoalDto, @CurrentUser() user: UserPayload) {
    return this.goalsService.create(createGoalDto, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@CurrentUser() user: UserPayload) {
    return this.goalsService.findAll(user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @CurrentUser() user: UserPayload) {
    return this.goalsService.findOne(id, user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateGoalDto: UpdateGoalDto, @CurrentUser() user: UserPayload) {
    return this.goalsService.update(id, updateGoalDto, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @CurrentUser() user: UserPayload) {
    return this.goalsService.remove(id, user);
  }
}
