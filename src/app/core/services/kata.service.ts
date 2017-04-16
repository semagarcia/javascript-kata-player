import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Kata } from './../models/Kata';

@Injectable()
export class KataService {

    constructor(private httpSrv: Http) { }

    getAllKatas(): Observable<Array<Kata>> {
        return this.httpSrv.get('/api/katas')
            .map((res: Response) => res.json().katas )
            .catch((err) => Observable.throw(err));
    }

    createKata(kataToBeCreated: Kata): Observable<Kata> {
        return this.httpSrv.post('/api/katas', {})
            .map((res: Response) => res.json())
            .catch((err) => Observable.throw(err));
    }

}
