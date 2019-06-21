import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Post, PostManagerService } from 'app/services/post-manager.service';

export interface DialogData {
  subject: string;
  content: string;
  state:boolean;
}
@Component({
  selector: 'app-notice-modal',
  templateUrl: './notice-modal.component.html',
  styleUrls: ['./notice-modal.component.css']
})
export class NoticeModalComponent implements OnInit {
  model: Post = Post.from({});
  isNew = true;

  ngOnInit() {
    if (this.data.id) {
      this.posts.getContent(this.data).subscribe( res => {
        this.model = res.post;
        this.isNew = false;
      });
    }
    else {
      this.isNew = true;
    }
  }
form:FormGroup
  constructor(
    private posts: PostManagerService,
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<NoticeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Post)
  {
    this.makeForm()
  }

 

  makeForm(){
    this.form = this.fb.group({
      subject: [this.data.subject, [Validators.required]],
      content: [this.data.content, [Validators.required]],
    })  
  }
  get canNotSubmit() {
    return this.model.subject === '' || this.model.content === '' 
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  


}
