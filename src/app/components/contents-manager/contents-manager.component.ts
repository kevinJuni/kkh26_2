import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contents-manager',
  templateUrl: './contents-manager.component.html',
  styleUrls: ['./contents-manager.component.css']
})
export class ContentsManagerComponent implements OnInit {

  iconAddNew = faPlus;

  items = [1,2,3,4,5,6,7,8,9];

  constructor() { }

  ngOnInit() {
  }

  edit (item: any): void {

  }

}
