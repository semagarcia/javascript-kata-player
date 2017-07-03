import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { UsersService, ValidationMsgService } from './../../../core';
import { CustomValidators } from './user-dialog-validator.service';

import * as moment from 'moment';

@Component({
    selector: 'app-user-dialog',
    templateUrl: './user-dialog.component.html',
    styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {

    showError: boolean;   // TODO: Implementar con ngForm en vez de con showError flag
    showWaitingBackendCall: boolean;
    errorMessage: string;
    chooseRole = true;
    validateMsg: string;
    createUserForm = new FormGroup({
        name: new FormControl('', Validators.required),
        username: new FormControl('', Validators.required),
        password: new FormControl('', [ 
            Validators.required, 
            Validators.minLength(4)
        ]),
        confirmPassword: new FormControl('', [
            Validators.required, 
            Validators.minLength(4), 
            this.customValidators.validatePassword
        ]),
        rol: new FormControl('USER'),
        email: new FormControl('', [
            Validators.required, 
            Validators.email
        ])
    });

    constructor(private usersSrv: UsersService,
                private dialogRef: MdDialogRef<UserDialogComponent>, 
                private formBuilder: FormBuilder,
                private customValidators: CustomValidators,
                private validationMsg: ValidationMsgService,
                @Inject(MD_DIALOG_DATA) private data: any) { }

    ngOnInit() {
        this.showWaitingBackendCall = false;
        this.showError = false;
        this.errorMessage = '';
        this.validateMsg = '';
        this.chooseRole = this.data.chooseRole;
    }

    checkErrorsValidators(field: string) {
        this.validateMsg = this.validationMsg.getMessage(this.createUserForm.controls[field]);
    }

    onSubmittedForm() {
        if(1 /*this.name*/) {
            this.showWaitingBackendCall = true;
            this.showError = false;
            this.errorMessage = '';            
            this.usersSrv.createUser(this.createUserForm.value).subscribe(
                (result) => this.dialogRef.close(),
                (err) => this.validateMsg = `[${err.json().error}] - ${err.json().message}`
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
