import {Component, HostBinding, inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {UserResponseEntity} from '../../model/UserResponseEntity';
import {UserService} from '../../service/user-service';
import {SparkAccountEntity} from '../../model/SparkAccountEntity';
import {SparkAccountService} from '../../service/spark-account-service';

@Component({
  selector: 'app-top-data',
  imports: [
    MatIconModule
  ],
  templateUrl: './top-data.html',
  standalone: true,
  styleUrl: './top-data.scss'
})

export class TopData implements OnInit {
  @HostBinding('class.top-data') class: boolean = true;
  router = inject(Router);
  user?: UserResponseEntity = undefined;
  account?: SparkAccountEntity = undefined;

  constructor(private userService: UserService,
              private sparkAccountService: SparkAccountService) {
  }

  ngOnInit() {
    this.userService.getMe().subscribe({
      next: (me) => {
        this.user = me;
        this.sparkAccountService.getSparkAccountById().subscribe({
          next: (account) => {
            this.account = account;
            console.log(account)
          }
        })
      }
    })
  }
}
