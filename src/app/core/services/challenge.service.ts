import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Challenge } from './../models/Challenge';

@Injectable()
export class ChallengeService {

    constructor(private httpSrv: Http) {}

    /**
     * Get all the current challenges
     * @retuns {Observable<Array<Challenge>} challenges.
     */
    getCurrentChallenges(): Observable<Array<Challenge>> {
        return this.httpSrv.get('/api/challenges')
            .map((res:Response) => res.json())
            .catch((res:Response) => res.json().error);
    }

    /**
     * Create new challenge, assign a identifier and returns it.
     * @param playerId {string} the socketId.
     * @returns {string} UUID (v4).
     */
    createChallengeId(playerId: string, direction: string, duration: number, mode: string): Observable<string> {
        return this.httpSrv.post('/api/challenges/create', { 
                playerId: playerId,
                direction: direction,
                duration: duration,
                mode: mode
            })
            .map((res:Response) => res.json())
            .catch((res:Response) => res.json());
    }

    /**
     * Return all the information related to the specified challenge.
     * @param challengeId {string} the challenge identifier.
     * @returns {Challenge} challenge.
     */
    getChallengeInfo(challengeId: string): Observable<Challenge> {
        return this.httpSrv.get('/api/challenges/challenge/' + challengeId)
            .map((res:Response) => res.json())
            .catch((res:Response) => res.json());
    }

    /**
     * Check if exists a specified challenge.
     * @param challengeId {string} the challenge identifier.
     * @returns {boolean} exists.
     */
    checkIfChallengeIdExists(challengeId: string): Observable<boolean> {
        return this.httpSrv.get('/api/challenges/check-challenge-id/' + challengeId)
            .map((res:Response) => res.json())
            .catch((res:Response) => res.json());
    }

    /**
     * Add the user into a challenge room.
     * @param challengeId {string} the challenge identifier.
     * @param socketId {SocketIO.client} the client-side socket.
     */
    joinToChallengeRoom(challengeId: string, username: string, socketId: string) {
        return this.httpSrv.post('/api/challenges/join', {
                challengeId: challengeId,
                username: username,
                playerId: socketId
            })
            .map((res:Response) => res.json())
            .catch((res:Response) => res.json());
    }

}