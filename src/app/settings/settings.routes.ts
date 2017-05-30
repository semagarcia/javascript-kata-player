import { RouterModule, Routes } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { UsersComponent } from './users/users.component';
import { LearningPathComponent } from './learning-path/learning-path.component';
import { KataComponent } from './kata/kata.component';
import { EventsComponent } from './events/events.component';
import { LanguagesComponent } from './languages/languages.component';

export const SettingsRoutes: Routes = [
    { path: 'users', component: UsersComponent },
    { path: 'learning-paths', component: LearningPathComponent },
    { path: 'katas', component: KataComponent },
    { path: 'events', component: EventsComponent },
    { path: 'languages', component: LanguagesComponent }
];