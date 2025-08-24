import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {SparkAccount} from "./entities/spark-account.entity";
import {Repository} from "typeorm";
import {User} from "../users/entities/user.entity";
import {SparkTransaction} from "./entities/spark-transaction.entity";
import {Transactional} from "typeorm-transactional";
import {Benefit} from "../benefits/entities/benefit.entity";
import {BenefitRedemption} from "./entities/benefit-redemption.entity";

@Injectable()
export class SparkAccountsService {

  constructor(
      @InjectRepository(SparkAccount)
      private sparkAccountRepository: Repository<SparkAccount>,
      @InjectRepository(User)
      private userRepository: Repository<User>,
      @InjectRepository(Benefit)
      private benefitRepository: Repository<Benefit>,
      @InjectRepository(BenefitRedemption)
      private redemptionRepository: Repository<BenefitRedemption>
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

  @Transactional()
  async redeemBenefit(id: string, userId: string) {
    let user = await this.userRepository.findOneBy({
      id: userId
    });

    if (user == null){
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    let benefit = await this.benefitRepository.findOneBy({
      id: id
    });

    if (benefit == null){
      throw new NotFoundException(`Benefit with ID ${id} not found`);
    }

    if (user.account.amount - benefit.sparkPrice < 0) {
      throw new BadRequestException(`User with ID ${user.id} does not have sufficient funds`);
    }

    let redemption = new BenefitRedemption(user, benefit);
    user.account.amount = user.account.amount - benefit.sparkPrice;

    console.log(user)
    await this.redemptionRepository.save(redemption);
    await this.userRepository.save(user);
  }

  async findCurrent(id: string) {
    let user = await this.userRepository.findOneBy({
      id: id
    });

    if (user == null) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user.account;
  }
}
