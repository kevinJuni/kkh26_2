

export enum Orientation {
    Portrait = 0,
    Landscape = 1,
}

export enum Color {
    Mono = 1,
    Color = 2,
}

export enum LayoutOption {
    type1,
    type2,
    type3,
    type4,
}


export class PrinterSetting {
    constructor (
        public id: number,
        public driverName: string,
        public color: Color,
        public layout: LayoutOption,
        public orientation: Orientation,
        public posX: number,
        public posY: number
    ){}

    static fromJson (data) {
        if (!data)
            return null;

        return new PrinterSetting(
            data.id,
            data.driver_name,
            data.color,
            <LayoutOption>data.layout_option,
            <Orientation>data.orientation,
            data.position_x,
            data.position_y
        );
    }

}