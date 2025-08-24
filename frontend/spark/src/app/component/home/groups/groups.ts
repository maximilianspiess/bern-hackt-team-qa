import {Component, HostBinding, inject, OnInit} from '@angular/core';
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
  bucketService: BucketService = inject(BucketService);
  protected readonly Math: Math = Math;

  ngOnInit() {
    this.bucketService.getAllFriendBucket().subscribe({
      next: (buckets: FriendBucketEntity[]) => {
        this.friendBuckets = buckets;
      }
    });

    this.bucketService.getAllHabitBucket().subscribe({
      next: (buckets: HabitBucketEntity[]) => {
        this.habitBuckets = buckets;
      }
    });
  }

  protected generateGroupName(habits: HabitEntity[]) {
    // return habits.map(habit => habit.title).join(", ");
    return "Running! 🏃🏽"
  }
}

