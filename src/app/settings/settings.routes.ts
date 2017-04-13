import { Routes } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { LearningPathComponent } from './learning-path/learning-path.component';
import { KataComponent } from './kata/kata.component';

export const SettingsRoutes: Routes = [
    { path: '', redirectTo: '/settings/learning-paths', pathMatch: 'full' },
    { path: 'learning-paths', component: LearningPathComponent },
    { path: 'katas', component: KataComponent }
    // Katas/:someKindOfFilter
];