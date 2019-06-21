import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
export interface DialogData {
  ok: boolean,
  subject: string
}
@Component({
  selector: 'app-notice-remove-confirm',
  templateUrl: './notice-remove-confirm.component.html',
  styleUrls: ['./notice-remove-confirm.component.css']
})
export class NoticeRemoveConfirmComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<NoticeRemoveConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}
