
import { Member } from './member.model';

export class Advertiser {

    constructor (
        public id: number,
        public username: string,
        public name: string,
        public phone: string,
        public email: string,
        public status: number,
        public licenseNumber?: string,
        public agnecy?: number,
        public address?: string,
        public addressDetail?: string
    ){}

    static fromJson (data, adHoc?: boolean) {
        if (adHoc) {
            return new Advertiser(
                data.id,
                data.username,
                data.name,
                data.phone,
                data.email,
                data.status
            );
        }

        return new Advertiser(
            data.id,
            data.username,
            data.name,
            data.phone,
            data.email,
            data.status,
            data.license_number,
            data.agency,
            data.address,
            data.address_detail
        );
    }
}


export class AgeFilter {
    filter;

    static readonly OptionCount = 8;

    constructor (json: {}) {
        this.filter = json;
    }

    get child (): boolean {
        return this.filter.child;
    }

    get the10s (): boolean {
        return this.filter.the10s;
    }

    get the20s (): boolean {
        return this.filter.the20s;
    }

    get the30s (): boolean {
        return this.filter.the30s;
    }

    get the40s (): boolean {
        return this.filter.the40s;
    }

    get the50s (): boolean {
        return this.filter.the50s;
    }

    get the60s (): boolean {
        return this.filter.the60s;
    }

    get over70s (): boolean {
        return this.filter.over70s;
    }

    get display (): string {
        var array = [];

        if (this.child)
            array.push('어린이');

        if (this.the10s) array.push('10대');
        if (this.the20s) array.push('20대');
        if (this.the30s) array.push('30대');
        if (this.the40s) array.push('40대');
        if (this.the50s) array.push('50대');
        if (this.the60s) array.push('60대');
        if (this.over70s) array.push('70대 이상');

        if (array.length == AgeFilter.OptionCount) {
            return '전체';
        } else {
            return array.join(', ');
        }
    }
}


export class WeekdayFilter {
    filter;

    static readonly caption = ['일', '월', '화', '수', '목', '금', '토'];

    constructor (json: {}) {
        this.filter = json;
    }

    get sun() { return this.filter.sun; }
    get mon() { return this.filter.mon; }
    get tue() { return this.filter.tue; }
    get wed() { return this.filter.wed; }
    get thu() { return this.filter.thu; }
    get fri() { return this.filter.fri; }
    get sat() { return this.filter.sat; }

    get display (): string {
        let state = [this.sun, this.mon, this.tue, this.wed, this.thu, this.fri, this.sat];
        var result = [];

        for (var i = 0, j = state.length; i < j; ++i) {
            if (state[i]) {
                result.push(WeekdayFilter.caption[i]);
            }
        }

        return result.join(', ');
    }
}


export class AdPromotion {
    id: number;
    isStatic: boolean;
    couponType: string;
    status: boolean;
    probability: number;
    staticSerial: string;

    static readonly couponTypeCaptions = {
        normal: '일반',
        barcode: '바코드',
        serial: '일련번호',
        barcode_serial: '바코드&일련번호'
    }

    constructor (
        data: any
    ) {
        this.id = data.id;
        this.isStatic = data.is_static;
        this.status = data.status;
        this.couponType = data.coupon_type;
        this.probability = data.probability;
        this.staticSerial = data.static_serial;
    }

}


export class Ad {
    static readonly statusCaption = [
        '검토중',
        '집행중',
        '반려됨',
        '중지됨',
        '완료됨'
    ];

    targetMembers;

    constructor (
        public id: number,
        public title: string,
        public type: string,
        public status: number,
        public advertiser: Advertiser,
        public registeredAt: Date,
        public modifiedAt: Date,
        public deliveryStatus,
        public reason?: string,

        public image?: string,
        public startDate?: Date,
        public endDate?: Date,

        public startTime?: number,
        public endTime?: number,
        
        public targetMembership?,
        public targetERP?,
        public targetAge?,
        public targetGender?,
        public targetWeekday?,
        public targetDeliveryEnvironment?,
        public targetDistrict?,
        public targetExclusive?: Member[],

        public lastUpdate?,
        public promotion?: AdPromotion

    ){}

    get statusCaption () {
        return Ad.statusCaption[this.status];
    }

    /**
     * Bootstrap text class
     */
    get statusCaptionStyle () {
        switch (this.status) {
            case 0:
                return 'text-warning';
            case 1:
                return 'text-primary';
            case 2:
                return 'text-danger';
            default:
                return 'text-muted';
        }
    }

    get deliveredQuantity () {
        if (!this.deliveryStatus)
            return null;
        return this.deliveryStatus.purchasedPrinted + this.deliveryStatus.bonusPrinted;
    }

    get remainQuantity (): number {
        return this.deliveryStatus.purchased + this.deliveryStatus.bonus;
    }

    get printedQuantity (): number {
        return this.deliveryStatus.purchasedPrinted
            + this.deliveryStatus.bonusPrinted;
    }

    get targetAgeCaption () {
        return this.targetAge;
    }

    get targetWeekdayCaption (): string {
        return this.targetWeekday.display;
    }

    get typeCaption (): string {
        return this.type == 'P' ? '공익' : '일반';
    }

    get targetGenderCaption ():string {
        switch (this.targetGender) {
            case 'male': return '남자';
            case 'female': return '여자';
            default: return '전체';
        }
    }

    get targetDistrictCaption (): string {
        if (!this.targetDistrict || this.targetDistrict.length < 1)
            return '전체';

        if (this.targetDistrict.length > 1) {
            return this.targetDistrict[0].name + ' 외 ' + (this.targetDistrict.length - 1) + '개 지역';
        } else {
            return this.targetDistrict[0].name;
        }
    }

    
    get targetERPCaption (): string {
        return ERPNames[this.targetERP];
    }


    static from (data: any, type?: string) {

        if (type == 'list') {
            return new Ad (
                data.id,
                data.title,
                data.type,
                data.status,
                data.advertiser? Advertiser.fromJson(data.advertiser, true) : null,
                new Date(data.registered_at),
                new Date(data.modified_at),

                {
                    purchased: data.delivery_status.purchased,
                    purchasedPrinted: data.delivery_status.purchased_printed,
                    bonus: data.delivery_status.bonus,
                    bonusPrinted: data.delivery_status.bonus_printed
                },
            );
        }


        return new Ad(
            data.id,
            data.title,
            data.type,
            data.status,
            data.advertiser? Advertiser.fromJson(data.advertiser, true) : null,
            new Date(data.registered_at),
            new Date(data.modified_at),

            {
                purchased: data.delivery_status.purchased,
                purchasedPrinted: data.delivery_status.purchased_printed,
                bonus: data.delivery_status.bonus,
                bonusPrinted: data.delivery_status.bonus_printed
            },

            data.reason,
            data.image,
            new Date(data.start_date),
            data.end_date ? new Date(data.end_date) : null,

            data.start_time, data.end_time,

            data.target_membership,
            data.target_erp,
            new AgeFilter(data.target_age),
            data.target_gender,
            new WeekdayFilter(data.target_weekday),
            data.target_delivery_env,
            data.target_district === '0'? null : data.target_district ,
            data.target_exclusive ? data.target_exclusive.map(i => Member.from(i)) : null,

            data.last_update,
            new AdPromotion(data.promotion || {})
        )
    }
}


const ERPNames = {
    all: '전체',
    pm: 'PharmManager',
    upharm: 'UPharm',
    epharm: 'E-Pharm'
}