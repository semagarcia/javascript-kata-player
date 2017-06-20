import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { TrainingPath, Kata } from './../../core';

@Injectable()
export class TrainingService {

    constructor(private httpSrv: Http) { }

    getTrainingPaths(): Observable<Array<TrainingPath>> {
        return this.httpSrv.get('/api/training-paths')
            .map((res: Response) => res.json())
            .catch((res: Response) => res.json());
    }

    getKatasOfTrainingPath(topic: string): Observable<TrainingPath> {
        return this.httpSrv.get(`/api/training-paths/${topic}/katas`)
            .map((res: Response) => res.json())
            .catch((res: Response) => res.json());
    }

    getTrainingPathsForGrid(): Observable<Array<TrainingPath>> {
        return this.httpSrv.get('/api/training-paths/grid')
            .map((res: Response) => res.json())
            .catch((res: Response) => res.json());
    }

    createTrainingPath(topic: string, name: string, description: string): Observable<TrainingPath> {
        return this.httpSrv.post('/api/training-paths', { topic: topic, name: name, description: description})
            .map((res: Response) => res.json())
            .catch((res: Response) => res.json());
    }

}
