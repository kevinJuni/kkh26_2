
export class Category {
  constructor(
    public id: number,
    public name: string,
    public sorting: number
  ) {}

  static from (raw: any) {
    return new Category(raw.id, raw.name, raw.sorting);
  }
}


export class Content {
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
    public nativeName: string,
    public length: number,
    public purposes: string| string[]
  ) {}

  static from (raw: any) {
    return new AssetFile(raw.id, raw.content_type,
      raw.native_name, raw.length, raw.purposes);
  }

}