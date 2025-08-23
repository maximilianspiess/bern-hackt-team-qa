import {Component, HostBinding, inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

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
  userInitial: string = "";
  sparkCount: string = "1K";

  ngOnInit() {
    this.userInitial = sessionStorage.getItem("username")!.charAt(0).toUpperCase();
  }
}
