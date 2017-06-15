//import './polyfills.ts';
import { AppModuleNgFactory } from '../aot/src/app/app.module.ngfactory';
import { platformBrowser } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

/*if (environment.production) {
  enableProdMode();
}*/

enableProdMode();

console.log('Running AOT compiled');
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);