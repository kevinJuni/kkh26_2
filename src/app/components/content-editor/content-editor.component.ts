import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContentsService } from 'app/services/contents.service';
import { humanizeBytes } from 'ngx-uploader';

import { switchMap, map } from 'rxjs/operators';
import { forkJoin, throwError, of } from 'rxjs';

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
      header: 'ContentEditor.AssetPurposes.DetailBanner'
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
      title: [''],
      author: [''],
      recordedAt: [''],
      recordedLocation: '',
      description: [''],
      runningTime: [0],
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
    this.editor.disable();
    this.uploader.setDisabledState(true);

    return this.backend.verifyContent(model).pipe(
      switchMap(res => {
        if (res.response !== 'ok')
          return throwError(res);

        if (this.uploader.files.length)
          return forkJoin(this.uploader.startUpload());
        else
          return of([]);
      }),
      switchMap(res => {
        if (res['length']) {
          var errors = res.filter(e => !e.isDone);
          if (errors.length)
            return throwError(errors);
          model.assets = res.map(e => e.asset).concat(model.assets);
        }

        if (model.id)
          return this.backend.update(model);
        else
          return this.backend.addContent(model);
      })
    );
  }

  updateTotalSize($event) {
    let output = humanizeBytes($event);
    this.editor.controls.length.setValue(output);
  }

  setDisabledState(value: boolean) {
    if (value) {
      this.editor.disable();
    }
    else {
      this.editor.enable();
    }
    this.uploader.setDisabledState(value);
  }

}
