import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { IndividualComponent } from './individual/individual.component';
import { ChallengeComponent } from './challenge/challenge.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'individual', component: IndividualComponent },
  { path: 'challenge', component: ChallengeComponent }
];