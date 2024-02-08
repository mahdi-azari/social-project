import { Request, Response, NextFunction } from "express";

export function hey(req: Request, res: Response, next: NextFunction) {
    try {
        console.log("middleware");
        next();
    } catch (error) {
        console.log(error);
    }
}
