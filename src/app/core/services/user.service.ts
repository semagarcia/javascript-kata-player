import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from './../models/User';

@Injectable()
export class UserService {
    user: User;

    constructor(private httpSrv: Http) { }

    setUserContext(loggedUser: User): void {
        this.user = loggedUser;
    }

    getUserContext(): Promise<User> {
        return new Promise((resolve, reject) => {
            if(this.user)
                resolve(this.user);
            else 
                this.getUserInfo().subscribe(
                    (user => { 
                        this.user = user; 
                        resolve(user); 
                    }),
                    (err => reject('Error: ' + err) )
                );
        });
    }

    getUserInfo() {
        return this.httpSrv.get('/api/users')
            .map(res => res.json())
            .catch(err => err.json());
    }

}
