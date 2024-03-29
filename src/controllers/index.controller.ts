import { Request, Response, NextFunction } from "express";
import { Controller } from "../decorators/controller.decorator";
import { Map } from "../decorators/request.decoreator";
import { hey } from "../middlewares/hey.middleware";
@Controller("/")
class IndexController {
    constructor() {}
    @Map("get", "", [hey])
    index(req: Request, res: Response, next: NextFunction) {
        try {
            res.send("Welcome");
        } catch (error) {
            next(error);
        }
    }
}

export default IndexController;
