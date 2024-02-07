import { IsString, IsEmail, IsNotEmpty, IsMobilePhone, MinLength, validate } from "class-validator";
import { plainToClass } from "class-transformer";
export class CreateUserDto {
    @IsNotEmpty({ message: "First name should not be empty" })
    public firstName: string;

}