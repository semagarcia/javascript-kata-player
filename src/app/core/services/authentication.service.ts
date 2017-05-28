import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const STORAGE_KEY = 'kataPlayerJwtToken';
const DEFAULT_EXP_TIME = 5 * 60 * 60;

@Injectable()
export class AuthenticationService {

    constructor(private httpSrv: Http) { }

    setJwtToken(token: string, expirationTime: number = DEFAULT_EXP_TIME) {
        sessionStorage.setItem(STORAGE_KEY, token);
        if(expirationTime) {
            setTimeout(() => {
                this.removeJwtToken();
            }, expirationTime);
        }
    }

    getJwtToken() {
        return sessionStorage.getItem(STORAGE_KEY);
    }

    removeJwtToken() {
        sessionStorage.removeItem(STORAGE_KEY);
    }

    getJwtHeaders(): RequestOptions {
        // Create an authorization header with JWT token
        let jwtToken = this.getJwtToken();
        if(jwtToken) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + jwtToken });
            return new RequestOptions({ headers: headers });
        }
    }

}
