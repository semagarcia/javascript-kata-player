import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from './../material/material.module';

import { CoreModule } from './../core';
import { ChronometerComponent } from './chronometer/chronometer.component';
import { KataEditorComponent } from './kata-editor/kata-editor/kata-editor.component';
import { KataPlayerComponent } from './kata-player.component';

// Third party module
import { CodemirrorModule } from 'ng2-codemirror';

@NgModule({
    imports: [
        CommonModule,
        CodemirrorModule,
        CoreModule,
        FormsModule,
        HttpModule,
        MaterialModule
    ],
    declarations: [
        ChronometerComponent,
        KataEditorComponent,
        KataPlayerComponent
    ],
    exports: [ 
        ChronometerComponent,
        KataEditorComponent,
        KataPlayerComponent
    ],
    entryComponents: []
})
export class KataPlayerModule { 
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: KataPlayerModule,
            providers: []
        }
    }
}
