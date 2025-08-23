import { Component } from '@angular/core';
import {Progress} from './progress/progress';
import {UploadExplore} from './upload-explore/upload-explore';

@Component({
  selector: 'app-home',
  imports: [
    Progress,
    UploadExplore
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
