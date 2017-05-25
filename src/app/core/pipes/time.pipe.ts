import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'timeSpent'})
export class TimeElapsedPipe implements PipeTransform {
    transform(secs: number): string {
        if(secs >= 0) {
            let min = Math.floor(secs / 60);
            let sec = secs % 60;
            return `${min}min ${sec}sec`;
        } else {
            let min = Math.floor(-secs / 60);
            let sec = -secs % 60;
            return `-${min}min ${sec}sec`;
        }
    }
}