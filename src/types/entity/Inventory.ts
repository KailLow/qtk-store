import BaseEntity from "./BaseEntity";

export interface Products {
    [x: string]: any;
    importPrice: number;
    quantity: number;
    expiryDate: string;
}

export default interface Inventory extends BaseEntity {
    [x: string]: any;
    status: string;
    products: Products[];
    totalImportPrice: number;
    expiryDate: string;
}

export function createInventory(
    name: string,
    id: string,
    status: string,
    products: Products[],
    expiryDate: string,
    totalImportPrice: number = 0,
  ): Inventory {
    const product: Inventory = {
        name,
        id,
        status,
        products,
        expiryDate,
        totalImportPrice
    };
    return product;
}