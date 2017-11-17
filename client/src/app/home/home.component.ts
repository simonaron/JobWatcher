import {
  Http
} from '@angular/http';
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
  jobs = [];//mock[0].jobs;
  constructor(
    public http: Http
  ) {

    this.http.get('http://localhost:3001/jobs/SYSF_SFTF_DEV')
      .subscribe((data) => { 
        this.jobs.push(JSON.parse(data['_body'])[0]);
      })
    this.http.get('http://localhost:3001/jobs/SYSF_SFTF_PARAM')
      .subscribe((data) => { this.jobs.push(JSON.parse(data['_body'])[0])})
  }

  public ngOnInit() {
    console.log(this.jobs)
  }
}
