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
    IsOptional,
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

export class UpdateUserDto {
    @IsOptional()
    @IsNotEmpty({ message: "Please enter the name" })
    public firstName: string;

    @IsOptional()
    @IsNotEmpty({ message: "Please enter the lastName" })
    public lastName: string;

    @IsOptional()
    @IsNotEmpty({ message: "Please enter the userName" })
    public userName: string;

    @IsOptional()
    @Length(6, 12)
    @IsString()
    public password: string;

    @IsOptional()
    @Length(11)
    public phoneNumber: string;

    @IsOptional()
    @IsEmail()
    public email: string;
}
