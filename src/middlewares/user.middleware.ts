import { plainToClass } from "class-transformer";
import { Request, Response, NextFunction } from "express";
import { CreateUserDto } from "../dtos/user.dto"
import { validate } from "class-validator";

export const validateMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const createUserDto = plainToClass(CreateUserDto, req.body);
        const errors = await validate(createUserDto , {skipMissingProperties : false});
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};