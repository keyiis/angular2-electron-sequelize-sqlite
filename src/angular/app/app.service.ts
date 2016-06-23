import { Injectable } from '@angular/core';
import {NavsService} from '../../data/service/navsService';
@Injectable()
export class AppService {
    getNavs() : Promise<any[]>{
        return (new NavsService())
        .findAll()
        .then(navs=>navs)
        .catch(err=>err);
    }
}