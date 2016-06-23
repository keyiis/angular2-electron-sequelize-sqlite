import { Component,OnInit } from '@angular/core';
import { AppService } from './app.service';
@Component({
  selector: 'routea',
  template: `<h1>路由A</h1>
  `,
  styles: [`
    h1 {
      font-family: Arial, Helvetica, sans-serif;
      font-size:1.1em;
      color:red;
    }
  `],
  providers: [AppService]
})
export class AComponent implements OnInit {
  navs: any;
  constructor(private appService: AppService) {

  }
  ngOnInit() {
    this.appService.getNavs().then(function(_navs){
        console.log("结果----");
        console.log(_navs[0].name);
        this.navs=_navs;
    });
   
  }
}
