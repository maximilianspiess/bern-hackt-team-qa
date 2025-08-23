import { Component } from '@angular/core';
import {Progress} from '../progress/progress';

@Component({
  selector: 'app-home',
  imports: [
    Progress
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
