import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { TrainingPath, Kata } from './../../core';

@Injectable()
export class TrainingService {

    constructor(private httpSrv: Http) { }

    getTrainingPaths(): Observable<Array<TrainingPath>> {
        return this.httpSrv.get('/api/training-paths')
            .map((res: Response) => res.json().trainingPaths)
            .catch((res: Response) => res.json().error);
    }

    getKatasOfTrainingPath(topic): Observable<TrainingPath> {
        return this.httpSrv.get(`/api/training-paths/${topic}/katas`)
            .map((res: Response) => res.json().trainingPath)
            .catch((res: Response) => res.json().error);
    }

}
