import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { IndividualComponent } from './individual/individual.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { StreamingComponent } from './streaming/streaming.component';

export const ROUTES: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'individual', component: IndividualComponent },
  { path: 'challenge', component: ChallengeComponent },
  { path: 'streaming', component: StreamingComponent },
  { path: '**', redirectTo: '' }
];