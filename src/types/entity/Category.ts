import BaseEntity from "./BaseEntity";

export default interface Category extends BaseEntity {
    [x: string]: any;
    name: string;
    productIds: string[];
    productQty: number;
}

export function createCategory(
    name: string,
    id: string,
    productIds: string[] = ['']
  ): Category {
    const productQty = productIds.length;
    const customer: Category = {
        name,
        id,
        productIds,
        productQty,
    };
    return customer;
}