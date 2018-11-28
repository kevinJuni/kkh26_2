import { Component, EventEmitter, Output } from '@angular/core';
import {
  UploadOutput, UploadInput, UploadFile,
  humanizeBytes, UploaderOptions, UploadStatus
} from 'ngx-uploader';

import { environment } from 'environments/environment';
import { Subject } from 'rxjs';
import { AssetFile } from 'app/models';

@Component({
  selector: 'app-file-drop',
  templateUrl: './file-drop.component.html',
  styleUrls: ['./file-drop.component.scss']
})
export class FileDropComponent {
  formData: FormData;
  files: UploadFile[];
  filePurposes = {};
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  options: UploaderOptions;

  @Output()
  totalLengthUpdated = new EventEmitter<number>();

  @Output()
  progress: EventEmitter<UploadFile> = new EventEmitter<UploadFile>();

  constructor() {
    this.options = { concurrency: 10 };
    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>();
    this.humanizeBytes = humanizeBytes;    
  }

  purposeOptions = {};

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
      this.files.push(output.file);
      this.filePurposes[output.file.id] = [];
      this.totalLengthUpdated.emit(this.totalLength);
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      this.onUploadDone(output.file);
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
      this.totalLengthUpdated.emit(this.totalLength);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    } else if (output.type === 'rejected' && typeof output.file !== 'undefined') {
      console.log(output.file.name + ' rejected');
    } else if (output.type === 'done') {
      this.onUploadDone(output.file);
    }

    this.files = this.files.filter(file => file.progress.status !== UploadStatus.Done);
  }

  get totalLength () {
    if (this.files.length < 1)
      return 0;
    return this.files
      .map(e => e.size)
      .reduce((acc, curr) => acc + curr);
  }

  startUpload(): Subject<AssetPostingResponse>[] {
    const event: UploadInput = {
      type: 'uploadAll',
      url: `${environment.APIHost}/assets`,
      method: 'POST'
    };

    var list = this.files.map(e => {
      e.sub = new Subject<AssetPostingResponse>();
      return e.sub;
    });

    this.uploadInput.emit(event);
    return list;
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }

  drop (id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
    this.uploadInput.emit({ type: 'remove', id: id });
    delete this.filePurposes[id];
  }

  onUploadDone (file: UploadFile) {
    if (!file.sub) {
      return;
    }

    var sub = <Subject<AssetPostingResponse>>file.sub;
    if (sub) {
      sub.next(AssetPostingResponse.from(file.response, this.filePurposes[file.id]));
      sub.complete();
    }
    file.sub = null;
  }

  addPurpose (file: UploadFile) {
    this.filePurposes[file.id].push('');
  }

  removePurpose (file: UploadFile, purpose) {
    this.filePurposes[file.id].splice(purpose, 1);
  }
}


export class AssetPostingResponse {
  constructor(
    public response: string,
    public isDone: boolean,
    public asset?: AssetFile
  ){}

  static failed () {
    return new AssetPostingResponse('cancelled', false, null);
  }

  static from (raw: any, purposes?: string[]) {
    raw.purposes = purposes;
    return new AssetPostingResponse(raw.response, true, AssetFile.from(raw));
  }
}