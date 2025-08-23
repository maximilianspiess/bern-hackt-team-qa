import {Component, HostBinding, inject} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-top-data',
  imports: [],
  templateUrl: './top-data.html',
  styleUrl: './top-data.scss'
})

export class TopData {
  @HostBinding('class.top-data') class: boolean = true;
  router = inject(Router);
}
