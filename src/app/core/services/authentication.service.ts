import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';

const STORAGE_KEY = 'kataPlayerJwtToken';

@Injectable()
export class AuthenticationService {

    private jwtToken$: Subject<string>;

    constructor() { 
        this.jwtToken$ = new Subject();
    }

    setJwtToken(token: string) {
        sessionStorage.setItem(STORAGE_KEY, token);
        this.jwtToken$.next(token);
    }

    getJwtToken() {
        return sessionStorage.getItem(STORAGE_KEY);
    }

    isLoggedIn() {
        return !!this.getJwtToken();
    }

    jwtTokenSubscription() {
        return this.jwtToken$;
    }

    removeJwtToken() {
        console.log('Removing token...');
        sessionStorage.removeItem(STORAGE_KEY);
    }

}
