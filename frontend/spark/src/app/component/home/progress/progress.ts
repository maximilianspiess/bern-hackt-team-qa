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
  }

  parseChartData(data: HabitEntity[]): any {
    console.log('parseChartData', data);
    const result: any = {datasets: []};
    const userId: string = sessionStorage.getItem("userId")!;
    for (let [hIndex, habit] of data.filter(habit => habit.userId === userId).entries()) {
      for (let [gIndex, goal] of habit.goals.entries()) {
        const progress: number = getProgress(goal)
        result.datasets.push({
          data: [progress, 100 - progress],
          label: `${habit.title} |  ${goal.type}`,
          backgroundColor: [
            this.chartColorArray[(hIndex + gIndex) % this.chartColorArray.length],
            '#E2E3DC',
          ],
          hoverOffset: 2
        });
      }
    }
    return result;
  }
}
