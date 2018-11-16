

export class MemberComment {

    constructor (
        public id?: number,
        public author?: string,
        public comment? : string,
        public date?: Date
    ) {
        if (!this.date) {
            this.date = new Date();
        }
    }

    static from (data: any) {
        let id = data.id;
        let author = data.admin_id;
        let comment = data.comment;
        let date = new Date(data.posted_at);

        return new MemberComment(id, author, comment, date);
    }

}