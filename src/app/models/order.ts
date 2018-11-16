

export class Order {

    constructor (
        public id: number,
        public orderId: string,
        public postedAt: Date,
        public updatedAt: Date,
        public type: string,
        public erp: number,
        public owner: any,
        public quantity: number,
        public mileageConsumption: number,
        public totalOrder: number,
        public totalConsumption: number,
        public stackLimit: number,
        public stackMileage: number
    ) {}

    static from (data: any) {
      return new Order (
        data.id, data.order_id,
        new Date(data.posted_at),
        data.updated_at, data.type, data.erp,
        data.owner, data.quantity, data.mileage,
        data.total_order, data.total_consumption,
        data.stack_limit, data.stack_milage
      )
    }

    get productTypeCaption () {
        return this.type;
    }
}