import {Component, HostBinding, inject, OnInit} from '@angular/core';
import {BaseChartDirective} from 'ng2-charts';
import {getProgress} from '../../../model/GoalResponseEntity';
import {HabitService} from '../../../service/habit-service';
import {HabitEntity} from '../../../model/HabitEntity';

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
  private habitService: HabitService = inject(HabitService);

  ngOnInit(): void {
    this.habitService.getHabits().subscribe({
      next: (data: HabitEntity[]): void => {
        this.data = this.parseChartData(data);
      }
    });
    // Testdata
    const data = {
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

  parseChartData(data: HabitEntity[]): any {
    const result: any = {datasets: []};
    const userId: string = sessionStorage.getItem("userId")!;
    for (let habit of data.filter(habit => habit.userId === userId)) {
      for (let [index, goal] of habit.goals.entries()) {
        const progress: number = getProgress(goal)
        result.datasets.push({
          data: [progress, 100 - progress],
          label: habit.title,
          backgroundColor: [
            this.chartColorArray[index % this.chartColorArray.length],
            '#E2E3DC',
          ],
          hoverOffset: 2
        });
      }
    }
    return result;
  }
}
