import { plainToClass } from "class-transformer";
import { Request, Response, NextFunction } from "express";
import { CreateUserDto } from "../dtos/user.dto";
import { ValidationError, validate } from "class-validator";

export const validateMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const createUserDto: CreateUserDto = plainToClass(
            CreateUserDto,
            req.body
        );
        const errors: ValidationError[] = await validate(createUserDto, {
            skipMissingProperties: false,
        });
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        next();
    } catch (error) {
        next(error);
    }
};
