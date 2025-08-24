import {Component, HostBinding, inject, OnInit} from '@angular/core';
import {BaseChartDirective} from 'ng2-charts';
import {GoalService} from '../../../service/goal-service';
import {GoalResponseEntity} from '../../../model/GoalResponseEntity';

@Component({
  selector: 'app-progress',
  imports: [
    BaseChartDirective
  ],
  templateUrl: './progress.html',
  standalone: true,
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
  private goalService: GoalService = inject(GoalService);

  ngOnInit(): void {
    this.goalService.getGoalsByUserId(sessionStorage.getItem("userId")!).subscribe({
      next: (data: GoalResponseEntity[]): void => {
        this.parseChartData(data);
      }
    });
    // Testdata
    this.data = {
      datasets: [{
        data: [30, 70],
        label: 'GOAL1',
        backgroundColor: [
          this.chartColorArray[0],
          '#E2E3DC'
        ],
        hoverOffset: 2
      }, {
        data: [20, 80],
        label: 'GOAL2',
        backgroundColor: [
          this.chartColorArray[1],
          '#E2E3DC'
        ],
        hoverOffset: 2
      }, {
        data: [95, 5],
        label: 'GOAL3',
        backgroundColor: [
          this.chartColorArray[2],
          '#E2E3DC'
        ],
        hoverOffset: 2
      }, {
        data: [50, 50],
        label: 'GOAL4',
        backgroundColor: [
          this.chartColorArray[3],
          '#E2E3DC'
        ],
        hoverOffset: 2
      }, {
        data: [10, 90],
        label: 'GOAL4',
        backgroundColor: [
          this.chartColorArray[4],
          '#E2E3DC'
        ],
        hoverOffset: 2
      }]
    };
  }

  parseChartData(data: GoalResponseEntity[]): any {
    const result: any = {};
    for (let goal in data) {

    }
  }
}
