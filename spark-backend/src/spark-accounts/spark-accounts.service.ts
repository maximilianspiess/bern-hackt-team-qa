import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {SparkAccount} from "./entities/spark-account.entity";
import {Repository} from "typeorm";
import {User} from "../users/entities/user.entity";
import {SparkTransaction} from "./entities/spark-transaction.entity";
import {Transactional} from "typeorm-transactional";

@Injectable()
export class SparkAccountsService {

  constructor(
      @InjectRepository(SparkAccount)
      private sparkAccountRepository: Repository<SparkAccount>,
      @InjectRepository(User)
      private userRepository: Repository<User>
  ) {
  }

  async findOne(id: string) {
    let account = await this.sparkAccountRepository.findOne({
      where:{
        id: id
      }
    });

    if (account == null) {
      throw new NotFoundException(`SparkAccount with ID ${id} not found`);
    }

    return account;
  }

  @Transactional()
  async processTransaction(transaction: SparkTransaction) {
    // TODO: check whether logged in user is the payer in the transaction
    let payer = await this.userRepository.findOneBy({
      id: transaction.payerId
    });

    let payee = await this.userRepository.findOneBy({
      id: transaction.payeeId
    });

    if (payer == null){
      throw new NotFoundException(`Did not find user (payer) with ID ${transaction.payerId}`);
    }
    if (payee == null){
      throw new NotFoundException(`Did not find user (payee) with ID ${transaction.payeeId}`);
    }

    if (payer.account.amount - transaction.amount < 0){
      throw new BadRequestException(`User (payer) with ID ${payer.id} does not have sufficient funds`);
    }

    payer.account.amount = payer.account.amount - transaction.amount;
    payee.account.amount = payee.account.amount + transaction.amount;

    await this.userRepository.save([payer, payee]);
  }
}
