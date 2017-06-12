import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class TestExecutorService {

    constructor(private httpSrv: Http) { }

    checkExerciseCode(exerciseImpl: string, title: string): Observable<object> {
        return this.httpSrv.post('/api/katas/execute', { function: exerciseImpl, name: title })
            .map((res:Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }

}
