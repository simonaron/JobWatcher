import {
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'job',  
  styleUrls: [ './job.component.css' ],
  templateUrl: './job.component.html'
})
export class JobComponent implements OnInit {
  @Input() job;
  constructor() {}

  public ngOnInit() {
  }
}
