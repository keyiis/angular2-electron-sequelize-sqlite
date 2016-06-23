import { Component } from '@angular/core';
import { RouteConfig,ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { AComponent } from './a.component';
import { BComponent } from './b.component';
@Component({
  selector: 'my-app',
  template: `<h1>My First Angular 2 App</h1>
  <nav>
  <a class="btn btn-default" [routerLink]="['Routea']">路由A1</a>
  <a class="btn btn-default" [routerLink]="['Routeb']">路由B1</a>
  </nav>
  <router-outlet></router-outlet>
  `,
  styles: [`
    h1 {
      font-family: Arial, Helvetica, sans-serif
    }
    md-card{
      margin: 25px;
    }
  `],
  directives: [ROUTER_DIRECTIVES,AComponent,BComponent]
})
@RouteConfig([
  {
    path: '/a',
    name: 'Routea',
    component: AComponent,
    useAsDefault: true
  },
  {
    path: '/b',
    name: 'Routeb',
    component: BComponent
  }
])
export class AppComponent { }
