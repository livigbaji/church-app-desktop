import {IsNotEmpty, IsPhoneNumber, IsString, IsUUID, Length} from "class-validator";


export class ChangePinRequest {

    @IsString()
    @IsUUID()
    @IsNotEmpty()
    user!: string;

    @IsString()
    @Length(4)
    @IsNotEmpty()
    oldPin!: string;

    @IsString()
    @Length(4)
    @IsNotEmpty()
    newPin!: string;
}

export class LoginRequest {
    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber('NG')
    phone!: string;

    @IsString()
    @Length(4)
    @IsNotEmpty()
    pin!: string;
}