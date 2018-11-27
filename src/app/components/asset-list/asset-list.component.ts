import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { AssetFile, Content } from 'app/models';
import { ContentsService } from 'app/services/contents.service';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=> AssetListComponent),
      multi: true
    }
  ]
})
export class AssetListComponent implements ControlValueAccessor {

  @Input()
  owner: Content;

  propagateChange = (_: any) => {};

  model: AssetFile[];

  constructor(private contents: ContentsService) { }


  writeValue (value) {
    this.model = value;
  }

  registerOnChange (fn) {
    this.propagateChange = fn;
  }

  registerOnTouched () {}

  remove (item: AssetFile) {
    this.contents.removeAsset(this.owner, item)
      .subscribe(res => {
        let idx = this.model.indexOf(item);
        this.model.splice(idx, 1);
      });
  }
}
