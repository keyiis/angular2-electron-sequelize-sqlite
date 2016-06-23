import { Component } from '@angular/core';
@Component({
  selector: 'routeb',
  template: `<h1>路由B</h1>
  <button (click)="goBack()">返回</button>
  `,
  styles: [`
    h1 {
      font-family: Arial, Helvetica, sans-serif;
      font-size:1em;
      color:red;
    }
  `]
})
export class BComponent {
  goBack() {
    window.history.back();
  }
 }
