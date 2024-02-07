import { IsString, IsEmail, IsNotEmpty, IsMobilePhone, MinLength, validate, IsInt } from "class-validator";
import { plainToClass } from "class-transformer";
export class CreateUserDto {
    @IsNotEmpty({ message: "نام را وارد کنید" })
    public firstName: string;
}