export class Challenge {

    challengeId: string;
    challengeKata: string;
    creator: string;
    playerA: string;
    usernamePlayerA: string;
    playerB: string;
    usernamePlayerB: string;
    timestamp: Date;
    status: ChallengeStatus;
    result: ChallengeResult;

    constructor(id:string, playerId:string) {
        this.challengeId = id;
        this.creator = playerId;
        this.timestamp = new Date();
        this.status = ChallengeStatus.WAITING;
    }

}

export enum ChallengeStatus { 'WAITING', 'PLAYING', 'ENDED' };

export class ChallengeResult {

}