import { IUser } from "./../interfaces/user.interface";
import userModel, { UserDocument } from "../models/user.model";
import { Model } from "mongoose";

class UserService {
    private readonly UserModel: Model<UserDocument> = userModel;

    public async createUser(userData: any): Promise<IUser> {
        return await this.UserModel.create(userData);
    }

    public async updateUser(
        userId: string,
        userData: any
    ): Promise<IUser | null> {
        return await this.UserModel.findByIdAndUpdate(userId, userData);
    }

    public async deleteUser(userId: string): Promise<IUser | null> {
        return await this.UserModel.findByIdAndDelete(userId);
    }

    public async getUser(): Promise<IUser[]> {
        return await this.UserModel.find();
    }
}

export default UserService;
