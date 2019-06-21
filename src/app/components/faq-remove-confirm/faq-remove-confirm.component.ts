import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
export interface DialogData {
  ok: boolean;
  subject: any;
}

@Component({
  selector: 'app-faq-remove-confirm',
  templateUrl: './faq-remove-confirm.component.html',
  styleUrls: ['./faq-remove-confirm.component.css']
})
export class FaqRemoveConfirmComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<FaqRemoveConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {

  }
}
