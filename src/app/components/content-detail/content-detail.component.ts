import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import { Content, ContentBrief } from 'app/models';
import { ContentsService } from 'app/services/contents.service';
import { ContentEditorComponent } from '../content-editor/content-editor.component';
import { BinarySelectComponent } from 'app/dialog-components/binary-select/binary-select.component';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.css']
})
export class ContentDetailComponent implements OnInit {

  @ViewChild('editor')
  editor: ContentEditorComponent;
  content: Content;

  modeNew: boolean = true;
  posting: boolean = false;

  constructor(
    private contents: ContentsService,
    private dialogs: MatDialog,
    public dialogRef: MatDialogRef<ContentDetailComponent>,
    private translate: TranslateService,
    private toaster: ToastrService,
    @Inject(MAT_DIALOG_DATA) public contentBrief: ContentBrief| any
  ) { }

  ngOnInit() {
    if (!this.contentBrief.id) {
      return;
    }

    this.contents.getDetail(this.contentBrief.id)
    .subscribe(content => {
      this.modeNew = false;
      this.content = content;
      this.editor.setModel(content);
    });
  }

  onPostingComplete (res) {
    this.dialogRef.close('reload');
  }

  onError (error) {
    this.posting = false;
    this.editor.setDisabledState(false);
    this.translate.get('Alert.CommonError').subscribe(errorMsg => {
      this.toaster.error(errorMsg, 'error!');
      console.error(error);
    });
  }
  
  remove () {
    this.dialogs.open(BinarySelectComponent, {
      width: '300px',
      data: {
        title: 'Common.Confirm',
        prompt: 'Prompt.ConfirmRemove',
        target: this.content.title
      }
    }).afterClosed().subscribe(selection => {
      if (selection === 'yes') {
        this.dialogRef.close('remove');
      }
    });
  }

  submit () {
    if (!this.modeNew) {
      this.dialogs.open(BinarySelectComponent, {
        width: '300px',
        data: {
          title: 'Common.Confirm',
          prompt: 'Prompt.ConfirmModify',
          target: this.content.title
        }
      }).afterClosed().subscribe(selection => {
        if (selection !== 'yes') {
          return;
        }
        this.posting = true;
        this.editor.submit().subscribe(
          this.onPostingComplete.bind(this),
          this.onError.bind(this)
        );
      });
    } else {
      this.posting = true;
      this.editor.submit().subscribe(
        this.onPostingComplete.bind(this),
        this.onError.bind(this)
      );
    }
  }

}
