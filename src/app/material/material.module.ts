import { NgModule } from '@angular/core';

import {
    MdAutocompleteModule,
    MdButtonToggleModule,
    MdButtonModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdCoreModule,
    MdDatepickerModule,
    MdDialogModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdNativeDateModule,
    MdProgressBarModule, 
    MdProgressSpinnerModule,
    MdRadioModule, 
    MdSelectModule,
    MdSidenavModule,
    MdSlideToggleModule,
    MdSliderModule,
    MdSnackBarModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule
} from '@angular/material';

const MATERIAL_MODULES = [
    MdAutocompleteModule,
    MdButtonToggleModule,
    MdButtonModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdCoreModule,
    MdDatepickerModule,
    MdDialogModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdNativeDateModule,
    MdProgressBarModule, 
    MdProgressSpinnerModule,
    MdRadioModule, 
    MdSelectModule,
    MdSidenavModule,
    MdSlideToggleModule,
    MdSliderModule,
    MdSnackBarModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule
];

@NgModule({
    imports: [ ...MATERIAL_MODULES ],
    exports: [ ...MATERIAL_MODULES ]
})
export class MaterialModule { }
