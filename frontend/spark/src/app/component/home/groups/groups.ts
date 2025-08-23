import {Component, HostBinding} from '@angular/core';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-groups',
  imports: [
    MatListModule,
  ],
  templateUrl: './groups.html',
  standalone: true,
  styleUrl: './groups.scss'
})

export class Groups {
  @HostBinding('class.groups') class: boolean = true;
}

