import {provide, enableProdMode} from '@angular/core';
import { bootstrap }    from '@angular/platform-browser-dynamic';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
// ROUTER
import {ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { AppComponent } from './app.component';
// 开启产品模式，否则console会输出Call enableProdMode() to enable the production mode.
// enableProdMode();
bootstrap(AppComponent, [ROUTER_PROVIDERS, { provide: LocationStrategy, useClass: HashLocationStrategy }]).catch((err:any) => console.error(err));