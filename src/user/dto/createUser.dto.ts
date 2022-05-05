import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    readonly username: string;

    @IsNotEmpty()
    readonly password: string;

    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly address: string;

    @IsNotEmpty()
    readonly cityId: string;
}