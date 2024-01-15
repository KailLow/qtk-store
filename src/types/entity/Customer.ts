import BaseEntity from "./BaseEntity";

export default interface Customer extends BaseEntity {
    [x: string]: any;
    name: string;
    phone: string;
    email: string;
    gender: "Male" | "Female";
    province: string;
    district: string;
    ward: string;
    address: string;
    birthDate: string;
    active: boolean;
}

export interface Address {
    province: string;
    district: string;
    ward: string;
}

export enum Gender {
    Male = "Male",
    Female = "Female"
}

export function createCustomer(
    name: string,
    phone: string,
    email: string,
    gender: Gender,
    province: string,
    district: string,
    ward: string,
    birthDate: string,
    active: boolean,
    id: string
  ): Customer {
    const address = ward + ", " + district + ", " + province;
    const customer: Customer = {
        name,
        phone,
        email,
        gender,
        province,
        district,
        ward,
        address,
        birthDate,
        active,
        id
    };
    return customer;
}