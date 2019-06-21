import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PostManagerService, Post } from 'app/services/post-manager.service';

export interface DialogData {
  subject: string;
  content: string;
  state: true;
}

@Component({
  selector: 'app-faq-modal',
  templateUrl: './faq-modal.component.html',
  styleUrls: ['./faq-modal.component.css']
})
export class FaqModalComponent implements OnInit {

  model: Post = Post.from({});
  isNew = true;

  constructor(
    private posts: PostManagerService,
    public dialogRef: MatDialogRef<FaqModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Post) {}

  onNoClick(): void {
    this.dialogRef.close();
  }



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

  get canNotSubmit() {
    return this.model.subject === '' || this.model.content === '' 
  }

}
