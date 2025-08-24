import {Component, HostBinding} from '@angular/core';
import {Progress} from './progress/progress';
import {UploadExplore} from './upload-explore/upload-explore';
import {Groups} from './groups/groups';

@Component({
  selector: 'app-home',
  imports: [
    Progress,
    UploadExplore,
    Groups
  ],
  templateUrl: './home.html',
  standalone: true,
  styleUrl: './home.scss'
})

export class Home {
  @HostBinding('class.home') class: boolean = true;
}
