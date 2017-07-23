import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions, XHRBackend } from '@angular/http';
import { RouterModule, Router } from '@angular/router';

// Own Modules
import { MaterialModule } from './material/material.module';
import { CoreModule } from './core/core.module';
import { AdministrationModule } from './administration/admin.module';
import { KataPlayerModule } from './kata-player/kata-player.module';

// Routes
import { ROUTES } from './app.routes';

// TODO: refactor to group them with spread operator
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { CurrentChallengeListComponent } from './current-challenge-list/current-challenge-list.component';
import { HomeComponent } from './home/home.component';
import { IndividualComponent } from './individual/individual.component';
import { LeaveChallengeComponent } from './dialogs/leave-challenge/leave-challenge.component';
import { LoginComponent } from './login/login.component';
import { StreamingComponent } from './streaming/streaming.component';
import { RankingComponent } from './ranking/ranking.component';
import { RefresherButtonComponent } from './refresher/refresher-button.component';
import { RefresherComponent } from './refresher/refresher.component';
import { TrainingComponent } from './training/training.component';

// Dialogs, Pipes & Services
import { AuthenticationService, HttpService } from './core';
import { ShowErrorService } from './dialogs';
import { 
    CreateChallengeDialog, 
    OpenStreamingDialog, 
    SelectTrainingPathDialog, 
    ShowErrorDialog, 
    WaitingChallengeDialog
} from './dialogs';

// 3rd party libraries
import { AgGridModule } from 'ag-grid-angular/main';
//import { CodemirrorModule } from 'ng2-codemirror';
import { Ng2DeviceDetectorModule } from 'ng2-device-detector';
import 'hammerjs';

//import 'codemirror/mode/javascript/javascript';

@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
        ChallengeComponent,
        CreateChallengeDialog,
        CurrentChallengeListComponent,
        HomeComponent,
        IndividualComponent,
        LoginComponent,
        LeaveChallengeComponent,
        OpenStreamingDialog,
        RankingComponent,
        RefresherButtonComponent,
        RefresherComponent,
        SelectTrainingPathDialog,
        ShowErrorDialog,
        StreamingComponent,
        TrainingComponent,
        WaitingChallengeDialog
    ],
    imports: [
        AdministrationModule,
        AgGridModule.withComponents([]),
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        FormsModule,
        HttpModule,
        KataPlayerModule.forRoot(),
        MaterialModule,
        Ng2DeviceDetectorModule.forRoot(),
        RouterModule.forRoot(ROUTES, { useHash: true })
    ],
    providers: [
        AuthenticationService,
        ShowErrorService,
    ],
    entryComponents: [
        CreateChallengeDialog,
        OpenStreamingDialog,
        SelectTrainingPathDialog,
        ShowErrorDialog,
        WaitingChallengeDialog
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
