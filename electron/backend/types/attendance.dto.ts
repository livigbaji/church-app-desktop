import {AttendanceStatus} from "./common.type";
import {IsBoolean, IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, IsUUID} from "class-validator";


export class ListAttendanceRequest {

    @IsBoolean()
    @IsNotEmpty()
    isExternal!: boolean;

    @IsDate()
    @IsNotEmpty()
    date!: Date;

    @IsPositive()
    @IsInt()
    limit!: number;

    @IsPositive()
    @IsInt()
    offset!: number;
}

export class signInRequest {

    @IsString()
    @IsUUID()
    @IsNotEmpty()
    user!: string;

    @IsBoolean()
    @IsNotEmpty()
    isExternal!: boolean;

    @IsString()
    @IsUUID()
    @IsOptional()
    position!: string;

    @IsDate()
    @IsNotEmpty()
    timeIn!: Date;

    @IsEnum(AttendanceStatus)
    @IsNotEmpty()
    status!: AttendanceStatus
}
