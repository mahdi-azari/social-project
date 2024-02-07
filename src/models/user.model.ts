import { model, Schema, Document, Types } from "mongoose";
import { IUser, Role } from "../interfaces/user.interface";

export type UserDocument = IUser & Document;

const userSchema: Schema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        birthDate: Date,
        verifiedEmail: {
            type: Boolean,
            default: false,
        },
        verifiedPhoneNumber: {
            type: Boolean,
            default: false,
        },
        active: {
            type: Boolean,
            default: true,
        },
        role: {
            type: String,
            enum: Role,
            default: Role.User,

        },
        followers: {
            type: Types.ObjectId,
            ref: 'User',
        },
        following: {
            type: Types.ObjectId,
            ref: 'User',
        }
    },
    {
        timestamps: true,
    }
);

const userModel = model<UserDocument>("User", userSchema);

export default userModel;