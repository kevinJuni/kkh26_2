import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCoffee, faPlus, faFolderOpen
} from '@fortawesome/free-solid-svg-icons';

import {DragDropModule} from '@angular/cdk/drag-drop';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';

library.add(faCoffee, faPlus, faFolderOpen);

import {
  MatDialogModule,
  MatCardModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule, MatDatepickerModule, MatNativeDateModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatToolbarModule, MatMenuModule,
  MatIconModule,
  MatRippleModule,
  MatDividerModule,
  MatTooltipModule,
  MatPaginatorModule,
  MatButtonModule, MatCheckboxModule
} from '@angular/material';

@NgModule({
  exports: [
    FlexLayoutModule,
    MatDialogModule,
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,MatDatepickerModule, MatNativeDateModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatToolbarModule, MatMenuModule,
    MatIconModule,
    MatRippleModule,
    MatDividerModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatButtonModule, MatCheckboxModule,
    DragDropModule, ScrollDispatchModule,
  ],
})
export class CustomMaterialModule { }
