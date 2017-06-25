import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EmailService {

    constructor(private httpSrv: Http) { }

    sendMail(from: string, to: string, subject: string, message: string): Observable<any> {
        let body = {
            from,
            to,
            subject,
            message
        }
        return this.httpSrv.post('/api/email', body)
            .catch((response: Response) => Observable.throw(response.text()))
    }

}
