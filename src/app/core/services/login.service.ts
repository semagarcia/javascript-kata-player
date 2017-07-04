import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';

@Injectable()
export class LoginService {

    constructor(private httpSrv: Http, private authSrv: AuthenticationService, private userSrv: UserService) { }

    /**
     * Performs login action, sending the user/pass and, as optional, the event in which is participating
     * @param username login username
     * @param password login password
     * @param eventSelected (optional) event associated
     */
    login(username: string, password: string, eventSelected: string): Observable<any> {
        return this.httpSrv.post('/api/login', {
          user: username,
          password: password,
          event: eventSelected
        })
          .map((res: Response) => {
            let loggedUser = res.json();
            this.authSrv.setJwtToken(loggedUser.token);
            this.userSrv.setUserContext(loggedUser);
            return loggedUser;
          })
          .catch((err: Response) => err.json().error);
    }

    /**
     * Logout; destroy the server session and removes the JWT token
     */
    logout(): Observable<any> {
        return this.httpSrv.delete('/api/login')
          .map((res: Response) => {
            this.authSrv.removeJwtToken();
          })
          .catch((err: Response) => err.json().error);
    }

}
