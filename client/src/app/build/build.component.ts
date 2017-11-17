import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  Http,
  Headers
} from '@angular/http';

@Component({
  selector: 'build',  
  styleUrls: [ './build.component.css' ],
  templateUrl: './build.component.html'
})
export class BuildComponent implements OnInit {
  constructor(
    public http: Http
  ) {}
  @Input() build;
  showMenu=false;
  show() {
    this.showMenu=true;
  }
  hide() {
    this.showMenu=false;
  }

  visitGerrit(hash) {
    // console.log('visit ',hash);
    // let headers=new Headers({"Access-Control-Allow-Origin":"*"});
    // this.http.get('https://gerrit.ericsson.se/changes/?q='+hash,{
    //   "headers":headers
    // }).subscribe((data) => {
    //   console.log(data);
    // })
    //window.open("https://www.google.com", "_blank");
  }

  public ngOnInit() {
  }
}
