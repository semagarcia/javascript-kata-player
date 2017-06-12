import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'

import { Kata } from './../models/Kata';

@Injectable()
export class IndividualService {

    constructor(private httpSrv: Http) { }

    getRandomKata(): Observable<Kata> {
        //return this.httpSrv.get('/api/individual/random?t=' + Math.random())
        return this.httpSrv.get('/api/individual/random')
            .map((res: Response) => res.json() )
            .catch((res: Response) => res.json().error);
    }

}
