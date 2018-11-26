import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContentsService } from 'app/services/contents.service';
import { ToastrService } from 'ngx-toastr';

import { switchMap, merge, combineLatest } from 'rxjs/operators';

import { Category, Content } from 'app/models';
import { TranslateService } from '@ngx-translate/core';
import { FileDropComponent } from '../file-drop/file-drop.component';
import { Observable, Subscription, forkJoin, throwError } from 'rxjs';
import { humanizeBytes } from 'ngx-uploader';

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
    private translate: TranslateService,
    private backend: ContentsService,
    private toaster: ToastrService
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
    }, this.onError.bind(this));
  }

  ngOnDestroy () {
  }

  makeForm () {
    this.editor = this.fb.group({
      category: ['', Validators.required],
      title: ['', Validators.required],
      author: ['', Validators.required],
      recordedAt: [''],
      recordedLocation: '',
      description: ['', Validators.required],
      runningTime: [0, Validators.required],
      length: 0
    });
  }


  submit () {
    if (this.editor.invalid)
      return;

    var model = Content.from(this.editor.value);

    this.backend.verifyContent(model).pipe(
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
    ).subscribe(
      this.onPostingComplete.bind(this),
      this.onError.bind(this)
    );
  }

  onPostingComplete (res) {
    console.log('is done:')
    console.log(res);
  }

  updateTotalSize($event) {
    let output = humanizeBytes($event);
    this.editor.controls.length.setValue(output);
  }

  onError (error) {
    this.translate.get('Alert.CommonError').subscribe(errorMsg => {
      this.toaster.error(errorMsg, 'error!');
      console.error(error);
    });   
  }
}
