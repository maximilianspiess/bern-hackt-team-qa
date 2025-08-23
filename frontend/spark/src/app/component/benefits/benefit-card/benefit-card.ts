import {Component, HostBinding, Input, signal} from '@angular/core';
import {BenefitEntity} from '../../../model/BenefitEntity';
import {MatCard, MatCardContent} from '@angular/material/card';

@Component({
  selector: 'app-benefit-card',
  imports: [
    MatCard,
    MatCardContent
  ],
  templateUrl: './benefit-card.html',
  styleUrl: './benefit-card.scss'
})
export class BenefitCard {
  @HostBinding('class.benefit-card') class: boolean = true;
  @Input() benefit!: BenefitEntity;
}
