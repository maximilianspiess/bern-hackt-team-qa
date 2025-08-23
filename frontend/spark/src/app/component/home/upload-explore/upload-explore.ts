import {Component, HostBinding} from '@angular/core';
import {MatCard, MatCardContent} from '@angular/material/card';

@Component({
  selector: 'app-upload-explore',
  imports: [
    MatCard,
    MatCardContent
  ],
  templateUrl: './upload-explore.html',
  styleUrl: './upload-explore.scss'
})

export class UploadExplore {
  @HostBinding('class.upload-explore') class: boolean = true;
}
