import BaseEntity from "./BaseEntity";

export default interface StaffTouch extends BaseEntity {
    name: string;
    phone: string;
    email: string;
    role: string;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
    accountNonLocked: boolean;
    enabled: boolean;
}