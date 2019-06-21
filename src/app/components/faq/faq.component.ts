import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {FaqModalComponent} from '../faq-modal/faq-modal.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { PostManagerService, PostDataElement, Post } from 'app/services/post-manager.service';
import { FaqRemoveConfirmComponent } from '../faq-remove-confirm/faq-remove-confirm.component';
import { PagedList } from 'app/services';


@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  list = new PagedList<Post>();
  constructor(
    public dialog: MatDialog,
    private posts: PostManagerService,
  ) {}
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.posts.getFaq().subscribe( res => {
    this.dataSourcePush(res)
    });
  }

  displayedColumns: string[] = ['id', 'subject','delete'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Post>(this.list.items)




//push data 종류
  dataSourcePush(res: { items: Post[]; }) {
    this.list.items = res.items;
    this.dataSource = new MatTableDataSource<Post>(this.list.items);
    this.dataSource.paginator = this.paginator;
  }

  body(data: { subject: string; content: string; }) {
    const postData = {
      'type_id': 2,
      'subject': data.subject,
      'content': data.content
    };
    return postData;
  }




//faq 삭제하는 모달 열기
  openFaqRemove(e): void {
// tslint:disable-next-line: deprecation
    event.stopPropagation();
    const dialogRef = this.dialog.open(FaqRemoveConfirmComponent, {
      width: 'auto',
      data: {ok: true, subject: e.subject}
    });

    dialogRef.afterClosed().subscribe(result => {
      if ( result === true) {
        this.posts.removePost(e.id).subscribe( () => {
          this.posts.getFaq().subscribe( res => {
            this.dataSourcePush(res)
          });
        });
      }
    });
  }

  

  

  

 


  //faq추가하는 모달 열기
  openFaqModal(data): void {
    const dialogRef = this.dialog.open(FaqModalComponent, {
      width: 'auto',
      data: data || {subject: '', content: ''}
    });

    if ( !data.id  ) {

      dialogRef.afterClosed().subscribe((modalData) => {
        if (!modalData) {
          return;
        }
        if (modalData.subject === '' || modalData.content === '') {
          return;
        }

        this.posts.addPost(this.body(modalData)).subscribe( () => {
          this.posts.getFaq().subscribe( res => {
            this.dataSourcePush(res);
          });
        });
      });
    } else {
        dialogRef.afterClosed().subscribe( res => {
          if (!res) {
            return;
          }
          this.posts.updatePost(data.id, this.body(res) ).subscribe( () => {
              this.posts.getFaq().subscribe( res => {
                this.dataSourcePush(res)
              });
           });
        });
    }
  }
}


