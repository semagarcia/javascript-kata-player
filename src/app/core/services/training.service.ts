import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { KataMetadata, TrainingPath } from './../../core';

@Injectable()
export class TrainingService {

    constructor(private httpSrv: Http) { }

    getTrainingPaths(): Observable<Array<TrainingPath>> {
        return this.httpSrv.get('/api/training-paths')
            .map((res: Response) => res.json().trainingPaths)
            .catch((res: Response) => res.json().error);
    }

    getPathExercises(path): Observable<KataMetadata> {
        return this.httpSrv.get('/api/training-paths/' + path)
            .map((res: Response) => res.json().metadata)
            .catch((res: Response) => res.json().error);
    }

}
