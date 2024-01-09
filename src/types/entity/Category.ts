import BaseEntity from "./BaseEntity";

export default interface Category extends BaseEntity {
    [x: string]: any;
    name: string;
    productIds: string[]
}

export function createCategory(
    name: string,
    id: string,
    productIds: string[] = ['']
  ): Category {
    const customer: Category = {
        name,
        id,
        productIds
    };
    return customer;
}