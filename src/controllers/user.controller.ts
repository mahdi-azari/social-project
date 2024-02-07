
import { Request, Response, NextFunction } from "express";
import { Controller } from "../decorators/controller.decorator"
import { Map } from "../decorators/request.decoreator"
import UserService from "../services/user.service"
import bcrypt from "bcrypt";
@Controller("/user")
class UserController {
    private userService: UserService;
    constructor() {
        this.userService = new UserService();
    }

    @Map("post", "/registeruser", [])
    public async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { firstName, lastName, userName, password, phoneNumber, email } = req.body;
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            const user = await this.userService.createUser({
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