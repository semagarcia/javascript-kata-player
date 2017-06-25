import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable()
export class ValidationMsgService {

    public getMessage(field: AbstractControl): string {
        let result: string = null;
        
        if (field.invalid) {
            if (field.errors.required) {
                result= 'Field required';
            } else if (field.errors.minlength) {
                result=`The field can not have a length less than ${field.errors.minlength.requiredLength}`;
            } else if (field.errors.email) {
                result=`The value of the field does not match with an email`;
            } else if (field.errors.valideUserName) {
                result='The username already exist';
            } else if (field.errors.validatePassword) {
                result='The passwords are not equal';
            }
        }

        return result;
    }
}