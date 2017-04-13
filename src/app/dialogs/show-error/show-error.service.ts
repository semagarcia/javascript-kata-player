import { Injectable } from '@angular/core';
import { MdDialog } from '@angular/material';

import { DIALOG_ACTIONS } from './show-error-actions.enum';
import { ShowErrorDialog } from './show-error.component';

@Injectable()
export class ShowErrorService {
    private errorMessage: string;
    private textLabel: string;
    private action: DIALOG_ACTIONS;

    constructor(private dialog: MdDialog) { }

    showErrorInDialog(errorMessage: string, action: DIALOG_ACTIONS, textLabel?: string) {
        this.errorMessage = errorMessage;
        this.action = action;
        this.textLabel = textLabel;
        this.dialog.open(ShowErrorDialog);
    }

    getErrorMessage(): string {
        return this.errorMessage;
    }

    getAction(): DIALOG_ACTIONS {
        return this.action;
    }

    getTextLabel(): string {
        return this.textLabel;
    }

}
