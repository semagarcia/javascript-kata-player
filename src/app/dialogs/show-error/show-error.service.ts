import { Injectable } from '@angular/core';
import { MdDialog } from '@angular/material';

import { ShowErrorDialog } from './show-error.component';

@Injectable()
export class ShowErrorService {
    private errorMessage: string;
    private textLabel: string;

    constructor(private dialog: MdDialog) { }

    showErrorInDialog(errorMessage: string, textLabel: string) {
        this.errorMessage = errorMessage;
        this.textLabel = textLabel;
        this.dialog.open(ShowErrorDialog);
    }

    getErrorMessage(): string {
        return this.errorMessage;
    }

    getTextLabel(): string {
        return this.textLabel;
    }

}
