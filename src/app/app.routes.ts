import { Routes } from '@angular/router';

import { AuthenticationGuard } from './core';

import { AdminComponent } from './administration/admin.component';
import { AboutComponent } from './about/about.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { CurrentChallengeListComponent } from './current-challenge-list/current-challenge-list.component';
import { HomeComponent } from './home/home.component';
import { IndividualComponent } from './individual/individual.component';
import { LoginComponent } from './login/login.component';
import { RankingComponent } from './ranking/ranking.component';
import { StreamingComponent } from './streaming/streaming.component';
import { TrainingComponent } from './training/training.component';

import { AdminRoutes } from './administration';

export const ROUTES: Routes = [
  //{ path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard] },
  { path: 'administration', component: AdminComponent, children: AdminRoutes, canActivate: [AuthenticationGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'challenge/:challengeId', component: ChallengeComponent, canActivate: [AuthenticationGuard] },
  { path: 'challenge-list', component: CurrentChallengeListComponent, canActivate: [AuthenticationGuard] },
  { path: 'individual', component: IndividualComponent, canActivate: [AuthenticationGuard] },
  { path: 'ranking', component: RankingComponent },
  { path: 'streaming/:challengeId', component: StreamingComponent, canActivate: [AuthenticationGuard] },
  { path: 'training/:topic', component: TrainingComponent, canActivate: [AuthenticationGuard] },
  { path: '**', redirectTo: '' }
];