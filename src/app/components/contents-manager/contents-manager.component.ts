import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ContentsService, ContentBrief } from 'app/services/contents.service';
import { PagedList } from 'app/services';
import { ListResponse } from 'app/services/backend.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

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
    private contents: ContentsService
  ) { }

  ngOnInit() {
    this.contents.getList().subscribe(
      this.onListLoaded.bind(this),
      this.onError.bind(this)
    );
  }

  edit (item: any): void {

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

}
