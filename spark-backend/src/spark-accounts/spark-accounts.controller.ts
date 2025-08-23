import {Body, Controller, Get, Param, Patch, Post} from '@nestjs/common';
import {SparkAccountsService} from './spark-accounts.service';
import {SparkAccount} from "./entities/spark-account.entity";
import {SparkTransaction} from "./entities/spark-transaction.entity";

@Controller('spark-accounts')
export class SparkAccountsController {
  constructor(private readonly sparkAccountsService: SparkAccountsService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sparkAccountsService.findOne(id);
  }

  @Post()
  postTransaction(@Body() transaction: SparkTransaction) {
    return this.sparkAccountsService.processTransaction(transaction);
  }
}
