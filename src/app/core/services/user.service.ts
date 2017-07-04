import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from './../models/User';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
    user: User;

    constructor(private httpSrv: Http) {}

    setUserContext(loggedUser: User): void {
        this.user = loggedUser;
    }

    getUserContext(): Promise<User> {
        return new Promise((resolve, reject) => {
            if(this.user) {
                resolve(this.user);
            } else {
                this.getUserInfo()
                    .then((user) => {
                        this.user = user.json();
                        resolve(this.user);
                    })
                    .catch((err) => reject(err));
            }
        });
    }

    getUserInfo(): Promise<any> {
        return this.httpSrv.get('/api/users/session').toPromise();
    }

}
