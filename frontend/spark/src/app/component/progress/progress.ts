import {Component, HostBinding, OnInit} from '@angular/core';
import {BaseChartDirective} from 'ng2-charts';

@Component({
  selector: 'app-progress',
  imports: [
    BaseChartDirective
  ],
  templateUrl: './progress.html',
  styleUrl: './progress.scss'
})

export class Progress implements OnInit {
  @HostBinding('class.progress') class: boolean = true;
  chartColorArray: string[] = [
    '#FF7A4D',
    '#FF9A4D',
    '#FFB84D',
    '#FFCD4D',
    '#FFE34D',
    '#FFDAA2'
  ]
  data: any;

  ngOnInit(): void {
    // Testdata
    this.data = {
      datasets: [{
        data: [30, 70],
        label: 'GOAL1',
        backgroundColor: [
          'rgb(255, 99, 132)',
          '#E0E2ECFF'
        ],
        hoverOffset: 2
      }, {
        data: [20, 80],
        label: 'GOAL2',
        backgroundColor: [
          'rgb(54, 162, 235)',
          '#E0E2ECFF'
        ],
        hoverOffset: 2
      }, {
        data: [10, 90],
        label: 'GOAL3',
        backgroundColor: [
          'rgb(255, 205, 86)',
          '#E0E2ECFF'
        ],
        hoverOffset: 2
      },{
        data: [50, 50],
        label: 'GOAL4',
        backgroundColor: [
          'rgb(100, 205, 86)',
          '#E0E2ECFF'
        ],
        hoverOffset: 2
      }]
    };
  }

  parseChartData(data: any): any {
    return null;
  }
}
