import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config({path : `./.env`});
import { Application, Router, Request, Response, NextFunction } from "express";
import express from "express";
import { connect } from "mongoose";

class App {
    private app: Application;
    public port: number | string;
    constructor(routes: any) {
        this.app = express();
        this.port = process.env.PORT || 3004;
        this.dbConnection();
        this.setupMiddleware();
        this.setupRoutes(routes);
        this.errorHandler();
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`🚀 Server Run Port ${this.port}`);
        });
    }

    private async dbConnection() {
        try {
            const dbUrl = "mongodb://127.0.0.1:27017/social";
            await connect(dbUrl);
        } catch (error) {
            console.log(error);
        }
    }
    private setupMiddleware() {
        this.app.use(express.json());
    }
    private setupRoutes(routes: any) {
        routes.forEach((route: any) => {
            this.app.use(route.basePath, route.router);
        });
    }

    private errorHandler() {
        this.app.use(
            (
                err: Error,
                req: Request,
                res: Response,
                next: NextFunction
            ): void => {
                res.send({
                    message: err.message,
                });
            }
        );
    }
}

export default App;
