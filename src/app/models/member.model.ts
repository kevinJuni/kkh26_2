
import {PrinterSetting} from './printer-device.model';

enum MemberStatus {
    Normal = 1,
    Disabled,
}

export interface District {
    code: string,
    district: string
}

export class Member {
    static readonly statusCaption = [
        '탈퇴',
        '정상',
        '이용정지',
    ];

    constructor (
        public id: number,
        public username: string,
        public name: string,
        public address: District,
        public addressDetail: string,
        public phone: string,
        public mobilePhone: string,
        public status: number | string,
        public brn: string,
        public email: string,
        public registeredAt: Date,
        public erp: string,
        public mileage: number,
        public printerSetting: PrinterSetting,
        public clinics?: any
    ) {}

    get isEnabled () {
        return this.status == 1;
    }


    get licenseNumber () {
        return this.brn;
    }


    static from (data, option?: string): Member {
        if (option) {
            return new Member(
                <number>(data.id),
                data.username,
                data.name,
                data.address,
                data.address_detail,
                data.phone,
                data.mobile_phone,
                data.status,
                data.license_number,
                <string>data.email,
                new Date(data.registered_at),
                data.erp,
                data.mileage,
                PrinterSetting.fromJson(data.printer),
                data.clinics
            );
        } else {
            return new Member(
                <number>data.id,
                data.username,
                data.name,
                data.address,
                null,
                data.phone,
                data.mobile,
                data.status,
                data.license_number,
                data.email,
                new Date(),
                data.erp,
                data.mileage,
                null
            );
        }

    }
}