import {
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'build',  
  styleUrls: [ './build.component.css' ],
  templateUrl: './build.component.html'
})
export class BuildComponent implements OnInit {
  @Input() build;
  constructor() {}

  public ngOnInit() {
  }
}
