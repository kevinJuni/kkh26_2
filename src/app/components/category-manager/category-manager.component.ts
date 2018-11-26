import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { BinarySelectComponent } from 'app/dialog-components/binary-select/binary-select.component';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Category } from 'app/models';
import { ContentsService } from 'app/services/contents.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.css']
})
export class CategoryManagerComponent implements OnInit {

  items: Category[] = [];
  editor: FormControl;
  inAction = false;

  constructor(
    public fb: FormBuilder,
    private dialog: MatDialog,
    private toaster: ToastrService,
    private translate: TranslateService,
    private backend: ContentsService
  ) { 
    this.editor = this.fb.control('', Validators.required);
  }

  ngOnInit() {
    this.reload();
  }


  reload (): void {
    this.backend.getCategories().pipe(
      catchError(this.onError.bind(this))
    ).subscribe(res => {
      this.items = res.items;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    this.inAction = true;

    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    for (var i = 0; i < this.items.length; i++) {
      this.items[i].sorting = i;
    }

    this.backend.updateCategoriesSorting(this.items).subscribe(res => {
      this.inAction = false;
    }, error => {
      this.translate.get('Alert.CommonError').subscribe(errorMsg => {
        this.toaster.error(errorMsg, 'error!');

        //rollback
        //moveItemInArray(this.items, event.currentIndex, event.previousIndex);
      });
      this.inAction = false;
    });
  }


  add () {
    if (this.editor.invalid) {
      return;
    }
    this.inAction = true;
    var newOne = new Category(0, this.editor.value, this.items.length);

    this.backend.addCategory(newOne).subscribe(res => {
      this.items.push(newOne);
      this.editor.reset();
      this.inAction = false;
    }, this.onError.bind(this));
  }

  remove (item: Category) {
    var dialog = this.dialog.open(BinarySelectComponent, {
      width: '300px',
      data: {
        title: 'Common.Confirm',
        prompt: 'Prompt.ConfirmRemove',
        target: item.name
      }
    });

    dialog.afterClosed().subscribe(res => {
      if (res != 'yes')
        return;

      this.backend.removeCategory(item).subscribe(result => {
        this.items.splice(this.items.indexOf(item), 1);
      }, this.onError.bind(this));

    });
  }


  onError (error) {
    this.inAction = false;
    this.translate.get('Alert.CommonError').subscribe(errorMsg => {
      this.toaster.error(errorMsg, 'error!');
    });    
    return Observable.create({});
  }
}
