import { NgModule } from '@angular/core';

import {
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatRadioModule,
    MatMenuModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSelectModule
 } from "@angular/material";

@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatRadioModule,
        MatMenuModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatSelectModule
    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatRadioModule,
        MatMenuModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatSelectModule
    ]
})
export class MaterialModule {

}
