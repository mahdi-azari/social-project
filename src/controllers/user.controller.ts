import { Request, Response, NextFunction } from "express";
import { Controller } from "../decorators/controller.decorator";
import { Map } from "../decorators/request.decoreator";
import UserService from "../services/user.service";
import bcrypt from "bcrypt";
import { validateMiddleware } from "../middlewares/user.middleware";
import { IUser } from "../interfaces/user.interface";

@Controller("/user")
class UserController {
    private userService: UserService;
    constructor() {
        this.userService = new UserService();
    }

    @Map("post", "/registeruser", [validateMiddleware])
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
                throw new Error("عدد وارد نکنید");
            }
            const salt: string = bcrypt.genSaltSync(10);
            const hash: string = bcrypt.hashSync(password, salt);
            const user: IUser = await this.userService.createUser({
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                password: hash,
                phoneNumber: phoneNumber,
                email: email,
            });
            return res.status(201).json(user);
        } catch (error) {
            console.log(error);
        }
    }
}

export default UserController;
