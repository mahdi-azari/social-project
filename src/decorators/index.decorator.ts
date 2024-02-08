import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { IRoute } from "../interfaces/router.interface";
class Route implements IRoute {
    public basePath: string;
    public router: Router = Router();
    public ControllerClass: any;
    public controller: any;

    constructor(Controller: any) {
        this.ControllerClass = Controller;
        this.controller = new Controller();
        this.basePath = "";
        this.setupRoutes();
    }

    private setupRoutes() {
        this.basePath = Reflect.getMetadata("base", this.ControllerClass);

        const routes = Reflect.getMetadata("routerPath", this.controller);

        routes.forEach((route: any) => {
            (this.router as any)[route.method](
                route.path,
                route.middleware,
                (req: Request, res: Response, next: NextFunction) => {
                    this.controller[route.propertyKey](req, res, next);
                }
            );
        });
    }
}

export default Route;
