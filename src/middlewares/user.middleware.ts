import { plainToClass } from "class-transformer";
import { Request, Response, NextFunction } from "express";
import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto";
import { ValidationError, validate } from "class-validator";

export const createMiddleware = async (
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

export const updateMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log(req.body);
        const updateUserDto: UpdateUserDto = plainToClass(
            UpdateUserDto,
            req.body
        );
        const errors: ValidationError[] = await validate(updateUserDto, {
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
