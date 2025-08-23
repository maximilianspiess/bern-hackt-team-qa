import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {BottomNav} from './component/bottom-nav/bottom-nav';
import {TopData} from './component/top-data/top-data';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BottomNav, TopData],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
}
