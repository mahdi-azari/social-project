import { Request, Response, NextFunction } from "express";
import { Controller } from "../decorators/controller.decorator";
import { Map } from "../decorators/request.decoreator";
import UserService from "../services/user.service";
import { hashPassword } from "../utils/hashPassword";
import {
    createMiddleware,
    updateMiddleware,
} from "../middlewares/user.middleware";
import { IUser } from "../interfaces/user.interface";
import { hey } from "../middlewares/hey.middleware";
import { validateUserInput } from "../utils/validateUserInput";

@Controller("/user")
class UserController {
    private userService: UserService;
    constructor() {
        this.userService = new UserService();
    }

    @Map("get", "/", [])
    public async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.userService.getUser();
            res.send(user);
        } catch (error) {
            next(error);
        }
    }

    @Map("post", "/login", [])
    public async userLogin(req: Request, res: Response, next: NextFunction) {
        try {
            const userToken = await this.userService.userLogin(req.body);
            res.send(userToken)
        } catch (error) {
            next(error);
        }
    }

    @Map("get", "/:id", [])
    public async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const user = await this.userService.getUserById(id);
            res.send(user);
        } catch (error) {
            next(error);
        }
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
            validateUserInput(req.body);
            const hashPass: string = hashPassword(password);
            const user: IUser = await this.userService.createUser({
                firstName,
                lastName,
                userName,
                password: hashPass,
                phoneNumber: phoneNumber,
                email,
            });
            return res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }

    @Map("post", "/:id", [updateMiddleware])
    public async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            let {
                firstName,
                lastName,
                userName,
                password,
                phoneNumber,
                email,
            } = req.body;
            validateUserInput(req.body);
            if (password) {
                const hashPass: string = hashPassword(password);
                password = hashPass;
            }
            await this.userService.updateUser(id, {
                firstName,
                lastName,
                userName,
                password,
                phoneNumber,
                email,
            });
            res.send("Update shod");
        } catch (error) {
            next(error);
        }
    }

    @Map("post", "/deleteuser/:id", [])
    public async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await this.userService.deleteUser(id);
            res.send("User Delete");
        } catch (error) {
            next(error);
        }
    }
}

export default UserController;