import BaseEntity from "./BaseEntity";

export default interface Staff extends BaseEntity {
    [x: string]: any;
    name: string;
    phone: string;
    email: string;
    gender: "Male" | "Female";
    address: Address;
    birthDate: string;
    active: boolean;
}

interface Address {
    province: string;
    district: string;
    ward: string;
}

export function createStaff(
    name: string,
    phone: string,
    email: string,
    gender: "Male" | "Female",
    address: Address,
    birthDate: string,
    active: boolean,
    id: string
  ): Staff {
    const customer: Staff = {
        name,
        phone,
        email,
        gender,
        address,
        birthDate,
        active,
        id: ""
    };
    return customer;
}