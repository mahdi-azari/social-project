
import { Request, Response, NextFunction } from "express";
import { Controller } from "../decorators/controller.decoreator"
import { Map } from "../decorators/request.decoreator"
import UserService from "../services/user.service"

@Controller("/user")
class UserController {
    private userService: UserService;
   constructor () {
     this.userService = new UserService();
   }
  
    @Map("post", "/", [])
    public async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.userService.createUser(req.body);
            return res.status(201).json({ data: user });
        } catch (error) {
            console.log(error);
        }
    }

}


export default UserController;