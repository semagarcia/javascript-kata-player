import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'kata-chronometer',
    templateUrl: './chronometer.component.html',
    styleUrls: ['./chronometer.component.scss']
})
export class ChronometerComponent implements OnInit {
    timeElapsed: number;
    overduedExercise: boolean;
    counterDownObs: Subscription;

    @Input() mode: string;
    @Input() duration: number;
    @Input() direction: string;
    @Output() chronometer = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
        this.overduedExercise = false;
        this.direction = this.direction.toUpperCase();
        if (this.direction === 'ASC' && this.duration >= 0) {
            this.timeElapsed = 0;
        } else if (this.direction === 'DESC' && this.duration >= 0) {
            this.timeElapsed = this.duration * 60;  // Convert the minutes into seconds
        } else {
            throw new Error('KataChronometer input params are invalid');
        }

        this.counterDownObs = Observable.timer(0, 1000).subscribe((tick) => {
            // Update time elapsed
            this.timeElapsed = (this.direction === 'ASC') ? this.timeElapsed + 1 : this.timeElapsed - 1;
            
            // For every tick, emit an event
            this.chronometer.emit({
                event: 'tick',
                value: this.timeElapsed
            });

            // Send other events (overdue) when duration is enabled (this.duration)
            if (this.duration > 0 && !this.overduedExercise) {
                if (this.direction === 'ASC' && this.duration * 60 > this.timeElapsed) {
                    this.overduedExercise = true;
                    this.chronometer.emit({
                        event: 'overdue',
                        value: this.overduedExercise
                    });
                } else if (this.direction === 'DESC' && this.timeElapsed < 0) {
                    this.overduedExercise = true;
                    this.chronometer.emit({
                        event: 'overdue',
                        value: this.overduedExercise
                    });

                }
            }
        });
    }

}
