import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BenefitsService } from './benefits.service';
import { CreateBenefitDto } from './dto/create-benefit.dto';
import { UpdateBenefitDto } from './dto/update-benefit.dto';

@Controller('benefits')
export class BenefitsController {
  constructor(private readonly benefitsService: BenefitsService) {}

  @Post()
  create(@Body() createBenefitDto: CreateBenefitDto) {
    return this.benefitsService.create(createBenefitDto);
  }

  @Get()
  findAll() {
    return this.benefitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.benefitsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBenefitDto: UpdateBenefitDto) {
    return this.benefitsService.update(+id, updateBenefitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.benefitsService.remove(+id);
  }
}
