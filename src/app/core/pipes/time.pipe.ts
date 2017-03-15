import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'timeElapsed'})
export class TimeElapsedPipe implements PipeTransform {
    transform(secs: number): string {
        let min = Math.floor(secs / 60);
        let sec = secs % 60;
        return `${min}min ${sec}sec`;
    }
}