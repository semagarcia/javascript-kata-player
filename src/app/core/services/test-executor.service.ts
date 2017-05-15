import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class TestExecutorService {

    constructor(private httpSrv: Http) { }

    checkExerciseCode(exerciseImpl: string, title: string): Observable<object> {
        return this.httpSrv.post('/api/kata', { function: exerciseImpl, name: title })
            .map((res:Response) => res.json().result, 
                        (error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    formatOutput(result: Array<string>): string {
        let output = new Array<string>();
        result.forEach(line => {
            if(line.match(/^\s+\d\)/g)) {  // List specs
                line = `<span class="test-line-error">${line}</span>`;
            } else if(line.match(/passing/g)) {  // Passing tests
                line = `<span class="test-line-successful">${line}</span>`;
            } else if(line.match(/failing/g)) {  // Failing tests
                line = `<span class="test-line-error">${line}</span>`;
            }

            // Check for successful tests
            let checkCharacterFound = false;
            line.split('').forEach(letter => {
                if(letter.charCodeAt(0) === 10003) { 
                    checkCharacterFound = true; 
                }
            });

            if(checkCharacterFound) {
                line = `<span class="test-line-successful">${line}</span>`;
            }

            // Add the line processed
            output.push(line);
        });
        return output.join('\n');
    }

}
