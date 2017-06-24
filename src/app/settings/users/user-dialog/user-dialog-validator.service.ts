import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors, AsyncValidatorFn, ValidatorFn } from '@angular/forms';

import { UsersService } from '../../../core/services/users.service';

import { Observable } from 'rxjs/Observable';

function validateUserName(users: UsersService): AsyncValidatorFn {

    return (formControl: FormControl) => {
        return users.getUser(formControl.value)
            .map((user: any) => {
                let result = {
                    valideUserName: {
                        userNameRepeated: true
                    }
                };

                if (!user) {
                    result = null;
                }

                return result;
            });
    }
}

function validatePassword(): ValidatorFn {
    return (formControl: FormControl) => {
        let result = {
            validatePassword: true
        };

        if ((formControl.parent) && (formControl.parent.value.password === formControl.value)){
            result = null;
        }
        return result;
    }
}

@Injectable()
export class CustomValidators {

    public validatorUserName: AsyncValidatorFn;
    public validatePassword: ValidatorFn

    constructor(private _usersService: UsersService) {
        this.validatorUserName = validateUserName(_usersService);
        this.validatePassword = validatePassword();
    }
}