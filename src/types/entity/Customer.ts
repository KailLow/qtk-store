import BaseEntity from "./BaseEntity";

export default interface Customer extends BaseEntity {
    [x: string]: any;
    name: string;
    phone: string;
    email: string;
    gender: "Male" | "Female";
    address: Address;
    birthDate: string;
    active: boolean;
}

export interface Address {
    province: string;
    district: string;
    ward: string;
}

export function createCustomer(
    name: string,
    phone: string,
    email: string,
    gender: "Male" | "Female",
    address: Address,
    birthDate: string,
    active: boolean,
    id: string
  ): Customer {
    const customer: Customer = {
        name,
        phone,
        email,
        gender,
        address,
        birthDate,
        active,
        id
    };
    return customer;
}