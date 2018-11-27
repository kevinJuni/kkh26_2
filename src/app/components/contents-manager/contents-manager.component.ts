import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ContentsService } from 'app/services/contents.service';
import { PagedList } from 'app/services';
import { ListResponse } from 'app/services/backend.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material';
import { ContentDetailComponent } from '../content-detail/content-detail.component';
import { ContentBrief } from 'app/models';

@Component({
  selector: 'app-contents-manager',
  templateUrl: './contents-manager.component.html',
  styleUrls: ['./contents-manager.component.css']
})
export class ContentsManagerComponent implements OnInit {

  list = new PagedList();
  iconAddNew = faPlus;

  items = [1,2,3,4,5,6,7,8,9];

  constructor(
    private toaster: ToastrService,
    private translate: TranslateService,
    private dialogs: MatDialog,
    private contents: ContentsService
  ) { }

  ngOnInit() {
    this.reload();
  }

  onListLoaded (res: ListResponse<ContentBrief>) {
    this.list.items = res.items;
    this.list.totalCount = res.count;
  }

  onError (error) {
    this.translate.get('Alert.CommonError').subscribe(errorMsg => {
      this.toaster.error(errorMsg, 'error!');
      console.error(error);
    });
  }

  reload () {
    this.contents.getList().subscribe(
      this.onListLoaded.bind(this),
      this.onError.bind(this)
    );
  }

  showEditor (item?: ContentBrief) {
    const dialog = this.dialogs.open(ContentDetailComponent, {
      width: '50vw',
      data: item || {}
    });

    dialog.afterClosed().subscribe(res => {
      if (res !== 'remove') {
        return;
      }

      this.contents.remove(item.id).subscribe(_ => this.reload());
    });
  }

}
