import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { LearningPathComponent } from './learning-path/learning-path.component';
import { KataComponent } from './kata/kata.component';
import { EventsComponent } from './events/events.component';
import { LanguagesComponent } from './languages/languages.component';

export const AdminRoutes: Routes = [
    { path: 'events', component: EventsComponent },
    { path: 'katas', component: KataComponent },
    { path: 'languages', component: LanguagesComponent },
    { path: 'learning-paths', component: LearningPathComponent },
    { path: 'users', component: UsersComponent }
];