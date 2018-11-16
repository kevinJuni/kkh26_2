import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-content-editor',
  templateUrl: './content-editor.component.html',
  styleUrls: ['./content-editor.component.css']
})
export class ContentEditorComponent implements OnInit {

  editor: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.makeForm();
  }

  ngOnInit() {
  }

  makeForm () {
    this.editor = this.fb.group({
      category: '',
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required],

    });
  }

}
