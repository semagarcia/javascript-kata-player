import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { IndividualComponent } from './individual/individual.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { CurrentChallengeListComponent } from './current-challenge-list/current-challenge-list.component';
import { StreamingComponent } from './streaming/streaming.component';
import { RankingComponent } from './ranking/ranking.component';
import { SettingsComponent } from './settings/settings.component';

export const ROUTES: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'individual', component: IndividualComponent },
  { path: 'challenge', component: ChallengeComponent },
  { path: 'challenge/:challengeId', component: ChallengeComponent },
  { path: 'challenge-list', component: CurrentChallengeListComponent },
  { path: 'streaming/:challengeId', component: StreamingComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'settings', component: SettingsComponent },  // ToDo: Add guards
  { path: '**', redirectTo: '' }
];