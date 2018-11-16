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
  MatFormFieldModule,
  MatInputModule, MatDatepickerModule, MatNativeDateModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatToolbarModule, MatMenuModule,
  MatIconModule,
  MatDividerModule,
  MatButtonModule, MatCheckboxModule
} from '@angular/material';

@NgModule({
  exports: [
    FlexLayoutModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,MatDatepickerModule, MatNativeDateModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatToolbarModule, MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule, MatCheckboxModule,
    DragDropModule, ScrollDispatchModule
  ],
})
export class CustomMaterialModule { }
