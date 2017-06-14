import { Injectable } from '@angular/core';
import { MdDialog } from '@angular/material';

import { DIALOG_ACTIONS } from './show-error-actions.enum';
import { ShowErrorDialog } from './show-error.component';

@Injectable()
export class ShowErrorService {
    dialogTitle: string;
    errorMessage: string;
    textLabel: string;
    action: DIALOG_ACTIONS;

    constructor(private dialog: MdDialog) { }

    showErrorInDialog(title: string, errorMessage: string, action: DIALOG_ACTIONS, textLabel?: string) {
        this.dialogTitle = title;
        this.errorMessage = errorMessage;
        this.action = action;
        this.textLabel = textLabel;
        this.dialog.open(ShowErrorDialog);
    }

    getDialogTitle() {
        return this.dialogTitle;
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
