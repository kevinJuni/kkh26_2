
import { NumericIdentifier } from './common';
export class Category implements NumericIdentifier {
  constructor(
    public id: number,
    public name: string,
    public sorting: number
  ) {}

  static from (raw: any) {
    return new Category(raw.id, raw.name, raw.sorting);
  }
}


export interface ContentBrief extends NumericIdentifier {
  id: number;
  name: string;
  created_at: string;
}

export class Content implements NumericIdentifier {
  constructor(
    public id: number,
    public category: Category| number,
    public title: string,
    public author: string,
    public description: string,
    public recordedAt: Date,
    public recordedLocation: string,
    public runningTime: number,
    public length: number,
    public assets: AssetFile[]
  ) {}

  static from (raw: any) {
    return new Content(raw.id,
      raw.category instanceof Object ? Category.from(raw.category) : raw.category,
      raw.title, raw.author, raw.description,
      new Date(raw.recordedAt), raw.recordedLocation,
      raw.runningTime, raw.length,
      raw.assets? raw.assets.map(AssetFile.from) : []);
  }
}


export class AssetFile {
  constructor(
    public id: string, //GUID
    public contentType: string,
    public name: string,
    public length: number,
    public purposes: string| string[]
  ) {}

  get isListBanner (): boolean {
    return this.purposes.length && 0 <= this.purposes.indexOf('banner');
  }

  get isDetailBanner (): boolean {
    return this.purposes.length && 0 <= this.purposes.indexOf('header');
  }

  static from (raw: any) {
    return new AssetFile(raw.id, raw.content_type,
      raw.name, raw.length, raw.purposes);
  }

}