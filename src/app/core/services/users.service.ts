import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsersService {

    constructor(private httpSrv: Http) { }

    getAllUsers(): Observable<Array<any>> {
        return this.httpSrv.get('/api/users')
            .map((res: Response) => res.json())
            .catch((err) => err.json());
    }

    createUser(formDataObject: {name: string, username: string, password: string, email: string, rol: string}): Observable<any> {
        return this.httpSrv.post('/api/users', {
            name: formDataObject.name,
            username: formDataObject.username,
            password: formDataObject.password,
            email: formDataObject.email,
            rol: formDataObject.rol
        })
            .map((res: Response) => res.json())
            .catch((err) => Observable.throw(err));
    }

}
