import {CompanyEntity} from './CompanyEntity';

export class BenefitEntity{
  id: string;
  title: string;
  description: string;
  discount: number;
  expirationDate: Date;
  sparkPrice: number;
  imageUlr: string;
  company: CompanyEntity;

  constructor(id: string, title: string, description: string, discount: number, expirationDate: Date, sparkPrice: number, imageUrl: string, company: CompanyEntity) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.discount = discount;
    this.expirationDate = expirationDate;
    this.sparkPrice = sparkPrice;
    this.imageUlr = imageUrl;
    this.company = company;
  }
}
