export interface IUser {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    phoneNumber: string;
    birthDate?: Date;
    verifiedEmail: boolean;
    active: boolean;
}