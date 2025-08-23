import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {SparkAccountsService} from './spark-accounts.service';
import {SparkTransaction} from "./entities/spark-transaction.entity";
import {JwtAuthGuard} from "../users/auth/jwt-auth.guard";

@Controller('spark-accounts')
export class SparkAccountsController {
  constructor(private readonly sparkAccountsService: SparkAccountsService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sparkAccountsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  postTransaction(@Body() transaction: SparkTransaction) {
    return this.sparkAccountsService.processTransaction(transaction);
  }
}
