import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestOptionsArgs, Response, Request, Headers, XHRBackend } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from './authentication.service';
import { BaseRequestOptions } from '@angular/http';

@Injectable()
export class HttpService extends Http {

    private jwtToken: string;
    private excludedRoutes = [
        '/api/users/session'
    ];

    constructor(
            backend: XHRBackend, 
            defaultOptions: RequestOptions, 
            private authSrv: AuthenticationService, 
            private router: Router) {
        super(backend, defaultOptions);
        this.authSrv.jwtTokenSubscription().subscribe(
            (newToken) => this.jwtToken = newToken
        );
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        if(typeof url === 'string') {
            if(!options) {
                options = { headers: new Headers() };
            }
            this.setHeaders(options);
        } else {
            this.setHeaders(url);
        }
        return super.request(url, options).catch(this.catchErrors());
    }

    private setHeaders(objectToSetHeadersTo: Request | RequestOptionsArgs) {
        objectToSetHeadersTo.headers.set('Authorization', `JWT ${this.jwtToken}`);
    }

    private catchErrors() {
        return (res: Response) => {
            if(res.status === 401 || res.status === 403) {
                if(!this.shouldExcludeRoute(res.url))
                    this.router.navigate(['/login']);
                return Observable.of(res);
            } else {
                return Observable.throw(res);
            }
        };
    }

    private shouldExcludeRoute(url: string) {
        return this.excludedRoutes.find((endpoint) => url.indexOf(endpoint) > -1).length > 0;
    }


    /*get(url: string, options?: RequestOptionsArgs): Observable<any> {
        return super.get(url, this.requestOptions(options));
    }

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
        return super.post(url, body, this.requestOptions(options));
    }

    put(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
        return super.put(url, body, this.requestOptions(options));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<any> {
        return super.delete(url, this.requestOptions(options));
    }*/

    /*private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options && options.headers) {
            options.headers.append('Authorization', 'Bearer ' + this.authSrv.getJwtToken());
            return options;
        } else if (this.authSrv.getJwtToken()) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + this.authSrv.getJwtToken() });
            return new RequestOptions({ headers: headers });
        }
    }*/

}