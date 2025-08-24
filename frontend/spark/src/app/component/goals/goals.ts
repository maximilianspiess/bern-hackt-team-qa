import {Component, HostBinding, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {BaseChartDirective} from 'ng2-charts';
import {HabitService} from '../../service/habit-service';
import {HabitEntity} from '../../model/HabitEntity';
import {GoalResponseEntity} from '../../model/GoalResponseEntity';

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

export class Goals implements OnInit{
  @HostBinding('class.goals') class: boolean = true;
  graphColor: string = '#FF9A4D';
  habits: HabitEntity[] = [];

  constructor(private habitService: HabitService) {
  }

  ngOnInit() {
    this.habitService.getHabits().subscribe({
      next: (habits) => {
        this.habits = habits;
      }
    })
  }

  parseChartData(goal: GoalResponseEntity): any {
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
