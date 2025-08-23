import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { GoalsService } from './goals.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import type { UpdateGoalDto } from './dto/update-goal.dto';
import {JwtAuthGuard} from "../users/auth/jwt-auth.guard";

@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createGoalDto: CreateGoalDto) {
    return this.goalsService.create(createGoalDto);
  }

  @Get()
  findAll() {
    return this.goalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.goalsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGoalDto: UpdateGoalDto) {
    return this.goalsService.update(id, updateGoalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goalsService.remove(id);
  }
}
