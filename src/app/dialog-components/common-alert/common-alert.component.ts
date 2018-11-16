import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  prompt: string;
  title: string;
}

@Component({
  selector: 'app-common-alert',
  templateUrl: './common-alert.component.html',
})
export class CommonAlertComponent {

  constructor(
    public dialogRef: MatDialogRef<CommonAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    if (!data) {
      data = {
        prompt: 'OK?',
        title: 'confirm'
      };
    }
  }

}
