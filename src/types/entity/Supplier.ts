import BaseEntity from "./BaseEntity";
import { Address } from "./Customer";

export default interface Supplier extends BaseEntity {
    [x: string]: any;
    name: string;
    phone: string;
    email: string;
    address: Address;
    taxIdentificationNumber: string;
}

export function createSupplier(
    name: string,
    phone: string,
    email: string,
    address: Address,
    taxIdentificationNumber: string,
    id: string
  ): Supplier {
    const supplier: Supplier = {
        name,
        phone,
        email,
        address,
        taxIdentificationNumber,
        id
    };
    return supplier;
}