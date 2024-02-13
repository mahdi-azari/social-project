import { Model } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import userModel, { UserDocument } from "../models/user.model";
import { LoginRequestBody } from "../interfaces/req.interface";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";

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

    public async getUserById(userId: string): Promise<IUser | null> {
        return await this.UserModel.findById(userId);
    }

    public async userLogin(body: LoginRequestBody) {
        const { username, password } = body;
        const user: any = await this.UserModel.findOne({ username: username });

        if (!user) throw new Error("INVALID USERNAME OR PASSWORD");

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            if (!user) throw new Error("INVALID USERNAME OR PASSWORD");
        }

        const token = jwt.sign(
            { id: user._id, username: user.userName, role: user.role },
            process.env.KEYJWT as Secret
        );
        return token;
    }

    public async follow(body: any, params: any) {
        const { userId } = body;
        const { id } = params;

        const fUser = await this.UserModel.findById(userId);

        if (!fUser) throw new Error("User Nist");

        await this.UserModel.updateOne(
            { _id: userId },
            { $addToSet: { followers: id } }
        );

        const tUser = await this.UserModel.findById(userId);
        if (!tUser) throw new Error("User Nist");

        await this.UserModel.updateOne(
            { _id: id },
            { $addToSet: { following: userId } }
        );
        return;
    }
}

export default UserService;
