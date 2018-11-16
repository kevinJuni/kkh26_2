import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CommonAlertComponent } from 'app/dialog-components/common-alert/common-alert.component';

@Component({
  selector: 'app-entrance',
  templateUrl: './entrance.component.html',
  styleUrls: ['./entrance.component.css']
})
export class EntranceComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  login () {
    let dialogRef = this.dialog.open(CommonAlertComponent, {
      width: '250px',
      data: {title: 'ok?', prompt: 'ok?'}
    });
  }

}
