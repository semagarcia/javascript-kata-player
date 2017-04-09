import { Component, OnInit } from '@angular/core';
import { ShowErrorService } from './show-error.service';

@Component({
    selector: 'app-show-error',
    templateUrl: './show-error.component.html',
    styleUrls: ['./show-error.component.scss']
})
export class ShowErrorDialog implements OnInit {
    private errorMessage: string;
    private textLabel: string;

    constructor(private showErrorSrv: ShowErrorService) { }

    ngOnInit() {
        this.errorMessage = this.showErrorSrv.getErrorMessage();
        this.textLabel = this.showErrorSrv.getTextLabel();
    }

}
