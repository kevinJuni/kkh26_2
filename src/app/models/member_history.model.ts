import * as moment from 'moment';

export class MemberHistory {
    id :number;
    content: string;
    date: Date;

    constructor (id: number, content : string, date: Date) { 
        this.id = id;
        this.content = content;
        this.date = date;
    }


    static fromJson (data: any) {
        let id = data.id;
        let comment = data.message;
        let date = moment(data.posted_at);

        return new MemberHistory(id, comment, date.toDate());
    }
}