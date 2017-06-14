import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Event } from './../models/Event';

@Injectable()
export class EventService {

    constructor(private httpSrv: Http) { }

    getCurrentEvents(): Observable<any> {
        return this.httpSrv.get('/api/events')
            .map((res: Response) => res.json())
            .catch((err: Response) => err.json().error);
    }

    getAllInfoOfEvents(): Observable<Array<Event>> {
        return this.httpSrv.get('/api/events/all')
            .map((res: Response) => res.json())
            .catch((err: Response) => err.json().error);
    }

    createEvent(name: string, startDate: Date, desc: string, urlMaps?: string, endDate?: Date): Observable<any> {
        return this.httpSrv.post('/api/events', {
                name: name,
                startDate: startDate,
                description: desc,
                endDate: endDate,
                urlLoc: urlMaps
            })
            .map((res: Response) => res.json())
            .catch((err: Response) => err.json().error);
    }

    updateEvent(eventToModify: any) {
        return this.httpSrv.put('/api/events', { eventToModify: eventToModify })
            .map((res: Response) => res.json())
            .catch((err: Response) => err.json().error);
    }

    deleteEvents(eventsToDelete: any): Observable<boolean> {
        return this.httpSrv.post('/api/events/delete', { eventIds: eventsToDelete })
            .map((res: Response) => res.json())
            .catch((err: Response) => err.json().error);
    }

}
