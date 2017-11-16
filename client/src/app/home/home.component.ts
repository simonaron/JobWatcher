import {
  Component,
  OnInit
} from '@angular/core';
let mock = require('../../assets/mock-data/mock-data.json');

@Component({
  selector: 'home',  
  styleUrls: [ './home.component.css' ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  jobs = mock[0].jobs;
  constructor() {}

  public ngOnInit() {
    console.log(this.jobs)
  }
}
