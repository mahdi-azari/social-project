import { IUser } from "./../interfaces/user.interface";
import userModel, { UserDocument } from "../models/user.model";
import { Model } from "mongoose";

class UserService {
    private readonly UserModel: Model<UserDocument> = userModel;

    public async createUser(userData: any): Promise<IUser> {
        return await this.UserModel.create(userData);
    }
}

export default UserService;
