import {Component, HostBinding, inject} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-bottom-nav',
  imports: [
    MatToolbar,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './bottom-nav.html',
  standalone: true,
  styleUrl: './bottom-nav.scss'
})

export class BottomNav {
  @HostBinding('class.bottom-nav') class: boolean = true;
  router = inject(Router);
}
