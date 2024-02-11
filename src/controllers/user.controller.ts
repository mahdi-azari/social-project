import { Request, Response, NextFunction } from "express";
import { Controller } from "../decorators/controller.decorator";
import { Map } from "../decorators/request.decoreator";
import UserService from "../services/user.service";
import { hashPassword } from "../utils/hashPassword";
import { createMiddleware } from "../middlewares/user.middleware";
import { IUser } from "../interfaces/user.interface";
import { hey } from "../middlewares/hey.middleware";

@Controller("/user")
class UserController {
    private userService: UserService;
    constructor() {
        this.userService = new UserService();
    }

    @Map("post", "/registeruser", [createMiddleware, hey])
    public async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                firstName,
                lastName,
                userName,
                password,
                phoneNumber,
                email,
            } = req.body;
            if (
                !isNaN(Number(firstName)) ||
                !isNaN(Number(lastName)) ||
                !isNaN(Number(userName))
            ) {
                throw new Error("Do not enter a number");
            }
            const hashPass: string = hashPassword(password);
            const user: IUser = await this.userService.createUser({
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                password: hashPass,
                phoneNumber: phoneNumber,
                email: email,
            });
            return res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }
}

export default UserController;
