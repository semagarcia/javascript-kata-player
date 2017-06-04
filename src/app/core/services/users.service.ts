import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsersService {

    constructor(private httpSrv: Http) { }

    getAllUsers(): Observable<Array<any>> {
        return this.httpSrv.get('/api/users')
            .map((res: Response) => res.json())
            .catch((err) => err.json());
    }

}
