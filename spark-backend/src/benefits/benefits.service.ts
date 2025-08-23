import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateBenefitDto } from './dto/create-benefit.dto';
import { UpdateBenefitDto } from './dto/update-benefit.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Benefit} from "./entities/benefit.entity";
import {Repository} from "typeorm";
import {Company} from "./entities/company.entity";

@Injectable()
export class BenefitsService {
  constructor(
      @InjectRepository(Benefit)
      private benefitRepository: Repository<Benefit>,
      @InjectRepository(Company)
      private companyRepository: Repository<Company>
  ) {
  }

  findAll() {
    return this.benefitRepository.find({
      relations: ["company"]
    });
  }

  async findOne(id: string) {
    let benefit = await this.benefitRepository.findOneBy({
      id: id
    });

    if (benefit == null){
      throw new NotFoundException(`Benefit with ID ${id} not found`);
    }

    return benefit;
  }

}
