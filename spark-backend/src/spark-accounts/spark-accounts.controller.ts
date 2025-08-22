import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SparkAccountsService } from './spark-accounts.service';
import { CreateSparkAccountDto } from './dto/create-spark-account.dto';
import { UpdateSparkAccountDto } from './dto/update-spark-account.dto';

@Controller('spark-accounts')
export class SparkAccountsController {
  constructor(private readonly sparkAccountsService: SparkAccountsService) {}

  @Post()
  create(@Body() createSparkAccountDto: CreateSparkAccountDto) {
    return this.sparkAccountsService.create(createSparkAccountDto);
  }

  @Get()
  findAll() {
    return this.sparkAccountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sparkAccountsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSparkAccountDto: UpdateSparkAccountDto) {
    return this.sparkAccountsService.update(+id, updateSparkAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sparkAccountsService.remove(+id);
  }
}
