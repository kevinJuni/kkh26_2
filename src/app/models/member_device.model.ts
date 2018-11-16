

export class ClientDevice {

    constructor (
        public id: number,
        public recIp: string,
        public agentNumber: number,
        public version: number,
        public setupIndex: number,
        public systemVersion: string,
        public registeredAt: Date,
        public loggedAt: Date,
        public printerStatus: number,
        public last_scheduled_at: Date,
        public latest_printout: Date,
        public report_required: boolean,
        public serviceStatus: number,
        public isActive: boolean,
        public ownerId: number,
    ) { 
    }


    static fromJson (data: any) {
        let id = data.id;
        let comment = data.message;
        let date = new Date(data.recdate);

        return new ClientDevice(
            data.id,
            data.rec_ip,
            data.agent_number,
            data.version,
            data.setup_index,
            data.system_version,
            new Date(data.registered_at),
            new Date(data.logged_at),
            data.printer_status,
            data.last_scheduled_at,
            data.latest_printout,
            data.report_required,
            data.service_status,
            data.is_active,
            data.owner_id
        );
    }
}