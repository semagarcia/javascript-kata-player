import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'numberOfKatas'
})
export class NumberOfKatasPipe implements PipeTransform {

    transform(value: string | number, singular: string, plural: string): string {
        let quantity = 0;
        if(typeof(value) === 'number') {
            quantity = value;
        } else if(typeof(value) === 'string') {
            let quantity = (Number(value)) ? Number(value) : 0;
        } else {
            throw Error('Param received is not a number or string containing a number.');
        }

        // Try to recover from the bad situation 
        return (value === 0 || value >= 2) ? plural : singular;
    }

}
