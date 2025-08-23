import {Component, HostBinding, Input} from '@angular/core';
import {BenefitEntity} from '../../../model/BenefitEntity';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from './confirm-dialog.component';
import {BenefitService} from '../../../service/benefit-service';

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

  constructor(private dialog: MatDialog,
              private benefitService: BenefitService){}

  openDialog(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {title: 'Do you want to redeem ' + this.benefit.title + '?', price: this.benefit.sparkPrice}
    })

    dialogRef.afterClosed().subscribe(res => {
      if (res){
        this.benefitService.redeemBenefit(this.benefit.id);
      } else {
        // do nothing
      }
    })
  }
}
