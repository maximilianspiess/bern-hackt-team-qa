export class CompanyEntity{
  id: string;
  name: string;
  imageUrl: string;

  constructor(id: string, name: string, imageUrl: string) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
  }
}
