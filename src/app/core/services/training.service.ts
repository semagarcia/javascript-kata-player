import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { KataExercise, TrainingPath } from './../../core';

@Injectable()
export class TrainingService {

    constructor(private httpSrv: Http) { }

    getTrainingPaths(): Observable<Array<TrainingPath>> {
        return this.httpSrv.get('/api/training-paths')
            .map((res: Response) => res.json().trainingPaths)
            .catch((res: Response) => res.json().error);
    }

    getPathExercises(path): Observable<Array<KataExercise>> {
        return this.httpSrv.get(`/api/training-paths/${path}/exercises`)
            .map((res: Response) => res.json().exercises)
            .catch((res: Response) => res.json().error);
    }

}
