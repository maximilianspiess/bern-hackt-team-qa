import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {BottomNav} from './component/bottom-nav/bottom-nav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BottomNav],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
}
