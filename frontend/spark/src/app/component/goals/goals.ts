import {Component, HostBinding} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {BaseChartDirective} from 'ng2-charts';

@Component({
  selector: 'app-goals',
  imports: [
    MatCardModule,
    BaseChartDirective,
  ],
  templateUrl: './goals.html',
  standalone: true,
  styleUrl: './goals.scss'
})

export class Goals {
  @HostBinding('class.goals') class: boolean = true;
  graphColor: string = '#FF9A4D';

  parseChartData(data: any): any {
    return {
      datasets: [{
        data: [30, 70],
        label: 'GOAL1',
        backgroundColor: [
          this.graphColor,
          '#E2E3DC'
        ],
        hoverOffset: 2
      }]
    };
  }
}
