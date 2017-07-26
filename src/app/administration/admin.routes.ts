import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { EventsComponent } from './events/events.component';
import { I18NComponent } from './i18n/i18n.component';
import { KataComponent } from './kata/kata.component';
import { KataFormComponent } from './kata/kata-form/kata-form.component';
import { LearningPathComponent } from './learning-path/learning-path.component';
import { ProgrammingLanguagesComponent } from './programming-languages/programming-languages.component';
import { UsersComponent } from './users/users.component';

export const AdminRoutes: Routes = [
    { path: 'events', component: EventsComponent },

    // children
    { path: 'katas/create', component: KataFormComponent },


    { path: 'katas', component: KataComponent },
    { path: 'programming-languages', component: ProgrammingLanguagesComponent },
    { path: 'learning-paths', component: LearningPathComponent },
    { path: 'users', component: UsersComponent },
    { path: 'i18n', component: I18NComponent }
];