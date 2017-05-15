import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {

    constructor(private httpSrv: Http) { }

    loginUserForJSDayEs(username: string, email: string): Observable<any> {
        return this.httpSrv.post('/api/login', {
          user: username,
          email: email
        })
          .map((res: Response) => res.json())
          .catch((err: Response) => err.json().error);
    }

    logout(): Observable<any> {
        return this.httpSrv.get('/api/logout')
          .map((res: Response) => res.json())
          .catch((err: Response) => err.json().error);
    }

}
