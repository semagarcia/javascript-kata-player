import { Component, OnInit } from '@angular/core';
import { Challenge, ChallengeService } from './../core';

@Component({
    selector: 'app-current-challenge-list',
    templateUrl: './current-challenge-list.component.html',
    styleUrls: ['./current-challenge-list.component.scss']
})
export class CurrentChallengeListComponent implements OnInit {

    challenges: Array<Challenge>;

    constructor(private challengeSrv: ChallengeService) { }

    ngOnInit() {
        this.reload();
    }

    reload() {
        this.challenges = [];
        this.challengeSrv.getCurrentChallenges().subscribe(challenges => {
            this.challenges = challenges;
        });
    }

}
