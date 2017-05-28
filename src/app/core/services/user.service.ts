import { Injectable } from '@angular/core';
import { User } from './../models/User';

@Injectable()
export class UserService {
    user: User;

    constructor() { }

    setUserContext(loggedUser: User) {
        this.user = loggedUser;
    }

    getUserContext() {
        return this.user;
    }

}
