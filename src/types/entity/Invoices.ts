import BaseEntity from "./BaseEntity";

export interface Items {
    [x: string]: any;
    price: number;
    quantity: number;
    sumPrice: number;
}

export default interface Invoices extends BaseEntity {
    [x: string]: any;
    invoicesId: string;
    status: string;
    items: Items[];
    customer: string;
    dateIssued: string;
    totalAmount: number;
}

export function createInvoice(
    id: string,
    status: string,
    items: Items[],
    customer: string,
    dateIssu: string,
    totalAmount: number = 0,
  ): Invoices {
    const dateIssued = dateIssu.slice(0,10);
    const invoicesId = "QTK" + id.slice(0,7);
    const product: Invoices = {
        id,
        invoicesId,
        status,
        items,
        customer,
        dateIssued,
        totalAmount
    };
    return product;
}