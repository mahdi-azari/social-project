import {
    IsString,
    IsEmail,
    IsNotEmpty,
    IsMobilePhone,
    MinLength,
    validate,
    IsInt,
    Matches,
    Length,
    min,
    max,
} from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: "Please enter the name" })
    public firstName: string;

    @IsNotEmpty({ message: "Please enter the lastName" })
    public lastName: string;

    @IsNotEmpty({ message: "Please enter the userName" })
    public userName: string;

    @Length(6, 12)
    @IsString()
    public password: string;

    @Length(11)
    public phoneNumber: string;

    @IsEmail()
    public email: string;
}
