import BaseEntity from "./BaseEntity";
import { Address } from "./Customer";

export default interface Supplier extends BaseEntity {
    [x: string]: any;
    name: string;
    phone: string;
    email: string;
    province: string;
    district: string;
    ward: string;
    address: string;
    taxIdentificationNumber: string;
}

export function createSupplier(
    name: string,
    phone: string,
    email: string,
    province: string,
    district: string,
    ward: string,
    taxIdentificationNumber: string,
    id: string
  ): Supplier {
    const address = ward + ", " + district + ", " + province;
    const supplier: Supplier = {
        name,
        phone,
        email,
        province,
        district,
        ward,
        address,
        taxIdentificationNumber,
        id
    };
    return supplier;
}