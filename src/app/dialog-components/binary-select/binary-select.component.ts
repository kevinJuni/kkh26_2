import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface PromptOption
{
  title: string;
  prompt: string;
  target: any;
}

@Component({
  selector: 'app-binary-select',
  templateUrl: './binary-select.component.html',
  styleUrls: ['./binary-select.component.css']
})
export class BinarySelectComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<BinarySelectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PromptOption
  ) { }

  ngOnInit() {
  }

}
