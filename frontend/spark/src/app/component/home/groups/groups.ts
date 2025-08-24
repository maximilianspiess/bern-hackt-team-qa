import {Component, HostBinding, OnInit} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {BucketService} from '../../../service/bucket-service';
import {FriendBucketEntity} from '../../../model/FriendBucketEntity';
import {HabitBucketEntity} from '../../../model/HabitBucketEntity';
import {HabitEntity} from '../../../model/HabitEntity';

@Component({
  selector: 'app-groups',
  imports: [
    MatListModule,
  ],
  templateUrl: './groups.html',
  standalone: true,
  styleUrl: './groups.scss'
})

export class Groups implements OnInit {
  @HostBinding('class.groups') class: boolean = true;
  friendBuckets: FriendBucketEntity[] = [];
  habitBuckets: HabitBucketEntity[] = [];

  constructor(private bucketService: BucketService) {
  }

  ngOnInit() {
    this.bucketService.getAllFriendBucket().subscribe({
      next: (buckets) => {
        this.friendBuckets = buckets;
      }
    });

    this.bucketService.getAllHabitBucket().subscribe({
      next: (buckets) => {
        this.habitBuckets = buckets;
      }
    });
  }

  protected generateGroupName(habits: HabitEntity[]) {
    // return habits.map(habit => habit.title).join(", ");
    return "Running! 🏃🏽"
  }
}

