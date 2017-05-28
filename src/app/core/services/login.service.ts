import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';

@Injectable()
export class LoginService {

    constructor(private httpSrv: Http, private authSrv: AuthenticationService, private userSrv: UserService) { }

    login(username: string, password: string, eventSelected: string): Observable<any> {
        return this.httpSrv.post('/api/login', {
          user: username,
          password: password,
          event: eventSelected
        })
          .map((res: Response) => {
            let loggedUser = res.json().user;
            this.userSrv.setUserContext(loggedUser);
            this.authSrv.setJwtToken(loggedUser.token);
            return loggedUser;
          })
          .catch((err: Response) => err.json().error);
    }

    getCurrentEvents(): Observable<any> {
        return this.httpSrv.get('/api/events')
          .map((res: Response) => res.json())
          .catch((err: Response) => err.json().error);
    }

    logout(): Observable<any> {
        return this.httpSrv.get('/api/logout')
          .map((res: Response) => {
            this.authSrv.removeJwtToken();
          })
          .catch((err: Response) => err.json().error);
    }

}
