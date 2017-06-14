import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';

import { UsersService } from './../../../core';

import * as moment from 'moment';

@Component({
    selector: 'app-user-dialog',
    templateUrl: './user-dialog.component.html',
    styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {

    createUserForm = new FormGroup({
        name: new FormControl('', Validators.required),
        username: new FormControl('', Validators.required),
        password: new FormControl('', [Validators.required, Validators.minLength(4)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(4)]),
        rol: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email])
    });

    // TODO: Implementar con ngForm en vez de con showError flag
    showError: boolean;
    showWaitingBackendCall: boolean;
    errorMessage: string;

    constructor(private usersSrv: UsersService,
                private dialogRef: MdDialogRef<UserDialogComponent>, 
                private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.showWaitingBackendCall = false;
        this.showError = false;
        this.errorMessage = '';
    }

    onSubmittedForm() {
        if(1 /*this.name*/) {
            this.showWaitingBackendCall = true;
            this.showError = false;
            this.errorMessage = '';            
            this.usersSrv.createUser(this.createUserForm.value).subscribe(
                (result) => { console.log('user creation result: ', result); },
                (err) => { console.log('error user creation: ', err); }
            );
        } else {
            this.showError = true;
            this.errorMessage = 'Sorry, to create an event, you should fill all the required fields.';
            this.showWaitingBackendCall = false;
        }
    }

    closeDialog() {
        this.dialogRef.close(null);
    }
}
