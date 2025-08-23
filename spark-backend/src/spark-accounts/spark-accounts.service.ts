import { Injectable } from '@nestjs/common';
import { CreateSparkAccountDto } from './dto/create-spark-account.dto';
import { UpdateSparkAccountDto } from './dto/update-spark-account.dto';

@Injectable()
export class SparkAccountsService {
  create(createSparkAccountDto: CreateSparkAccountDto) {
    return 'This action adds a new sparkAccount';
  }

  findAll() {
    return `This action returns all sparkAccounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sparkAccount`;
  }

  update(id: number, updateSparkAccountDto: UpdateSparkAccountDto) {
    return `This action updates a #${id} sparkAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} sparkAccount`;
  }
}
