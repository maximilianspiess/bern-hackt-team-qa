import {CompanyEntity} from './CompanyEntity';

export class BenefitEntity{
  id: string;
  discount: number;
  expirationDate: Date;
  sparkPrice: number;
  company: CompanyEntity;

  constructor(id: string, discount: number, expirationDate: Date, sparkPrice: number, company: CompanyEntity) {
    this.id = id;
    this.discount = discount;
    this.expirationDate = expirationDate;
    this.sparkPrice = sparkPrice;
    this.company = company;
  }
}
