import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http, RequestOptions, XHRBackend } from '@angular/http';
import { RouterModule, Router } from '@angular/router';

// Guards
import { AuthenticationGuard } from './guards/authentication.guard';

// Pipes
import { TimeElapsedPipe } from './pipes/time.pipe';

// Services
import { AuthenticationService } from './services/authentication.service';
import { ChallengeService } from './services/challenge.service';
import { EmailService } from './services/email.service';
import { EventService } from './services/event.service';
import { HttpService } from './services/http.service';
import { IndividualService } from './services/individual.service';
import { KataService } from './services/kata.service';
import { LoginService } from './services/login.service';
import { NotificationService } from './services/notification.service';
import { SocketService } from './services/socket.service';
import { TestExecutorService } from './services/test-executor.service';
import { TrainingService } from './services/training.service';
import { UserService } from './services/user.service';
import { UsersService } from './services/users.service';
import { ValidationMsgService } from './services/validation-messages.service';

export function httpRequestInterceptor(
        backend: XHRBackend, 
        opts: RequestOptions, 
        authSrv: AuthenticationService, 
        router: Router
    ) { 
        return new HttpService(backend, opts, authSrv, router); 
}

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        RouterModule
    ],
    declarations: [
        TimeElapsedPipe
    ],
    exports: [
        TimeElapsedPipe
    ],
    providers: [
        AuthenticationGuard,
        AuthenticationService,
        ChallengeService,
        EmailService,
        EventService,
        HttpService,
        IndividualService,
        {
            provide: Http,
            useFactory: httpRequestInterceptor,
            deps: [XHRBackend, RequestOptions, AuthenticationService, Router]    
        },
        KataService,
        LoginService,
        NotificationService,
        SocketService,
        TestExecutorService,
        TrainingService,
        UserService,
        UsersService,
        ValidationMsgService
    ]
})
export class CoreModule {}