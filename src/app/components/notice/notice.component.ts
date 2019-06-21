import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { PostManagerService, PostDataElement, Post } from 'app/services/post-manager.service';
import { NoticeModalComponent } from '../notice-modal/notice-modal.component';
import { NoticeRemoveConfirmComponent } from '../notice-remove-confirm/notice-remove-confirm.component';
import { PagedList } from 'app/services';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {
  list = new PagedList<Post>();
  constructor(
    private posts: PostManagerService,
    public dialog: MatDialog,
    public fb: FormBuilder,
  ) {
  }
  ngOnInit() {
    this.posts.getNotice().subscribe( res => {
      this.dataSourcePush(res)
    });
  }
  displayedColumns: string[] = ['id', 'subject', 'date', 'symbol'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Post>(this.list.items);


  
  dataSourcePush(res: { items: Post[]; }) {
    this.list.items = res.items;
    this.dataSource = new MatTableDataSource<Post>(this.list.items);
    this.dataSource.paginator = this.paginator;
  }
  body(data: { subject: string; content: string; }) {
    const postData = {
      'type_id': 1,
      'subject': data.subject,
      'content': data.content
    };
    return postData;
  }


  openNoticeRemove(data):void {
// tslint:disable-next-line: deprecation
    event.stopPropagation();
    const dialogRef = this.dialog.open(NoticeRemoveConfirmComponent, {
      width: 'auto',
      data: {ok:true, subject: data.subject}
    });

    dialogRef.afterClosed().subscribe( res => {
      if(res === true) {
        this.posts.removePost(data.id).subscribe( () => {
          this.posts.getNotice().subscribe( res => {
            this.dataSourcePush(res);
          });
        });
      }
    });
  }



  openNoticeModal(data): void {
    const dialogRef = this.dialog.open(NoticeModalComponent, {
      width: 'auto',
      data: data || {subject: '', content: ''}
    });
    if( !data.id ){
      
      dialogRef.afterClosed().subscribe( modalData => {
        if (!modalData) {
          return;
        }
        if (modalData.subject === '' || modalData.content === '') {
          return;
        }
        this.posts.addPost(this.body(modalData)).subscribe( () => {
          this.posts.getNotice().subscribe( res => {
            this.dataSourcePush(res);
          });
        });
      });
    } else {
        dialogRef.afterClosed().subscribe( res => {
          if (!res) {
            return;
          }
          this.posts.updatePost(data.id, this.body(res)).subscribe( () => {
              this.posts.getNotice().subscribe(res => {
                this.dataSourcePush(res)
              });
           });
        });
    }
  }
}
