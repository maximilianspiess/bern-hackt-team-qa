import {CompanyEntity} from './CompanyEntity';

export class BenefitEntity{
  id: string;
  text: string;
  discount: number;
  expirationDate: Date;
  sparkPrice: number;
  image: string;
  company: CompanyEntity;

  constructor(id: string, text: string, discount: number, expirationDate: Date, sparkPrice: number, image: string, company: CompanyEntity) {
    this.id = id;
    this.text = text;
    this.discount = discount;
    this.expirationDate = expirationDate;
    this.sparkPrice = sparkPrice;
    this.image = image;
    this.company = company;
  }
}
