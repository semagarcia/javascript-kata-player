import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';

const STORAGE_KEY = 'kataPlayerJwtToken';

@Injectable()
export class AuthenticationService {

    constructor() { }

    setJwtToken(token: string, expirationTime: number = 0) {
        sessionStorage.setItem(STORAGE_KEY, token);
        //this.obsJwtToken$.next(token);
        if(expirationTime > 0) {
            setTimeout(() => {
                this.removeJwtToken();
            }, expirationTime);
        }
    }

    getJwtToken() {
        return sessionStorage.getItem(STORAGE_KEY);
    }

    isLoggedIn() {
        return !!this.getJwtToken();
    }

    /*jwtTokenSubscription() {
        return this.obsJwtToken$.asObservable();
    }*/

    removeJwtToken() {
        sessionStorage.removeItem(STORAGE_KEY);
    }

}
