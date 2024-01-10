import BaseEntity from "./BaseEntity";

export default interface User extends BaseEntity {
    [x: string]: any;
    name: string;
    role: string;
    email: string;
    active: string;
}

export function createUser(
    name: string,
    role: string,
    email: string,
    act: boolean,
    id: string
  ): User {
    const active = (act ? "Active" : "Deactive")
    const user: User = {
        name,
        role,
        email,
        active,
        id
    };
    return user;
}