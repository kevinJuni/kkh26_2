import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContentsService } from 'app/services/contents.service';
import { humanizeBytes } from 'ngx-uploader';

import { switchMap, map } from 'rxjs/operators';
import { forkJoin, throwError } from 'rxjs';

import { Category, Content } from 'app/models';
import { FileDropComponent } from '../file-drop/file-drop.component';

@Component({
  selector: 'app-content-editor',
  templateUrl: './content-editor.component.html',
  styleUrls: ['./content-editor.component.css']
})
export class ContentEditorComponent implements OnInit, OnDestroy {

  categories: Category[] = [];

  @ViewChild(FileDropComponent)
  uploader: FileDropComponent;

  editor: FormGroup;

  fileEvent;

  constructor(
    private fb: FormBuilder,
    private backend: ContentsService,
  ) {
    this.makeForm();
  }

  ngOnInit() {
    this.uploader.purposeOptions = {
      banner: 'ContentEditor.AssetPurposes.ListingBanner',
      header: 'ContentEditor.AssetPurposes.HeaderBanner'
    };
    this.backend.getCategories().subscribe(res => {
      this.categories = res.items;
      return res;
    });
  }

  ngOnDestroy () {
  }
  

  makeForm () {
    this.editor = this.fb.group({
      id: '',
      category: ['', Validators.required],
      title: ['', Validators.required],
      author: ['', Validators.required],
      recordedAt: [''],
      recordedLocation: '',
      description: ['', Validators.required],
      runningTime: [0, Validators.required],
      length: 0,
      assets: [[]]
    });
  }

  setModel (data: Content) {
    let copy = Object.assign({}, data);
    copy.category = (<Category>copy.category).id;
    this.editor.setValue(copy);

    this.editor.controls.length.setValue(humanizeBytes(data.length));
  }


  submit () {
    if (this.editor.invalid)
      return;

    var model = Content.from(this.editor.value);

    return this.backend.verifyContent(model).pipe(
      switchMap(res => {
        if (res.response !== 'ok')
          return throwError(res);

        return forkJoin(this.uploader.startUpload());
      }),
      switchMap(res => {
        var errors = res.filter(e => !e.isDone);
        if (errors.length)
          return throwError(errors);
        model.assets = res.map(e => e.asset);

        return this.backend.addContent(model);
      })
    );
  }

  updateTotalSize($event) {
    let output = humanizeBytes($event);
    this.editor.controls.length.setValue(output);
  }

}
