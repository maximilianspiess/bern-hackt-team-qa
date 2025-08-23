import {Component, HostBinding, OnInit} from '@angular/core';
import {BenefitService} from './benefit-service';
import {BenefitEntity} from '../../model/BenefitEntity';
import {BenefitCard} from './benefit-card/benefit-card';

@Component({
  selector: 'app-benefits',
  imports: [
    BenefitCard
  ],
  templateUrl: './benefits.html',
  styleUrl: './benefits.scss'
})

export class Benefits implements OnInit {
  @HostBinding('class.benefit') class: boolean = true;

  benefits: BenefitEntity[] = [];

  constructor(private benefitService: BenefitService) {
  }

  ngOnInit() {
    this.benefitService.getAllBenefits().subscribe({
      next: (benefits) => {
        this.benefits = benefits;
      }
    })
  }
}
