import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';

import { UsersService } from '../../../core/services/users.service';

import { Observable } from 'rxjs/Observable';

function validateUserName(users: UsersService): AsyncValidatorFn {

    return (formControl: FormControl) => {
        return users.getUser(formControl.value)
            .map((user: any) => {
                let result = {
                    valideUserName: false
                };

                if (!user) {
                    result = null;
                }

                return result;
            });
    }
}

@Injectable()
export class UserNameValidator {

    public validator: AsyncValidatorFn;

    constructor(private _usersService: UsersService) {
        this.validator = validateUserName(_usersService);
    }
}