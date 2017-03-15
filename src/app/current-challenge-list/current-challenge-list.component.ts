import { Component, OnInit } from '@angular/core';
import { Challenge, ChallengeService } from './../core';

@Component({
    selector: 'app-current-challenge-list',
    templateUrl: './current-challenge-list.component.html',
    styleUrls: ['./current-challenge-list.component.scss']
})
export class CurrentChallengeListComponent implements OnInit {

    //private challenges: Array<Challenge>;
    challenges;

    constructor(private challengeSrv: ChallengeService) { }

    ngOnInit() {
        this.reload();
    }

    reload() {
        this.challenges = [];
        this.challengeSrv.getCurrentChallenges().subscribe(challenges => {

            // Change by filter operator

            challenges.forEach(c => {
                //console.log(c[1]);
                this.challenges.push(c[1]);
            });
        });
    }

}
