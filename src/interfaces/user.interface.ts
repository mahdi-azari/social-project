import { Types } from 'mongoose';

export enum Role {
    User,
    Admin
}
export interface IUser {
    firstName: string;
    lastName: string;
    userName: string;
    followers: Types.ObjectId;
    following: Types.ObjectId;
    email: string;
    password: string;
    phoneNumber: string;
    birthDate: Date;
    verifiedEmail: boolean;
    verifiedPhoneNumber: boolean;
    active: boolean;
    role: Role;
}