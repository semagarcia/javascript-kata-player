import { Routes } from '@angular/router';

import { AuthenticationGuard } from './core';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { IndividualComponent } from './individual/individual.component';
import { TrainingComponent } from './training/training.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { CurrentChallengeListComponent } from './current-challenge-list/current-challenge-list.component';
import { StreamingComponent } from './streaming/streaming.component';
import { RankingComponent } from './ranking/ranking.component';
import { SettingsComponent } from './settings/settings.component';
import { AboutComponent } from './about/about.component';

import { SettingsRoutes } from './settings';

export const ROUTES: Routes = [
  //{ path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard] },
  { path: 'individual', component: IndividualComponent },
  { path: 'training/:topic', component: TrainingComponent },
  { path: 'challenge', component: ChallengeComponent },
  { path: 'challenge/:challengeId', component: ChallengeComponent },
  { path: 'challenge-list', component: CurrentChallengeListComponent },
  { path: 'streaming/:challengeId', component: StreamingComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'settings', component: SettingsComponent, children: SettingsRoutes },  // ToDo: Add guards
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' }
];