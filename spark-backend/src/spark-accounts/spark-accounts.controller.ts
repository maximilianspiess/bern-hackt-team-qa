import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {SparkAccountsService} from './spark-accounts.service';
import {SparkTransaction} from "./entities/spark-transaction.entity";
import {JwtAuthGuard} from "../users/auth/jwt-auth.guard";
import {CurrentUser} from "../users/auth/user.decorator";
import {UserPayload} from "../users/auth/user-payload.model";

@Controller('spark-accounts')
export class SparkAccountsController {
  constructor(private readonly sparkAccountsService: SparkAccountsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findCurrentAccount(@CurrentUser() user: UserPayload) {
    return this.sparkAccountsService.findCurrent(user.id);
  }

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

  @UseGuards(JwtAuthGuard)
  @Post('redeem/:id')
  redeemBenefit(@Param('id') id: string, @CurrentUser() user: UserPayload){
    return this.sparkAccountsService.redeemBenefit(id, user.id);
  }
}
