import {
    IsDate,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber,
    IsPositive,
    IsString,
    Max
} from 'class-validator';
import {ExternalMemberLabel, Gender, MaritalStatus, MemberStatus} from "./common.type";

export class TestStuff {
    @IsNotEmpty()
    @IsString()
    name!: string;
}

export class ListMembersRequest {
    @IsOptional()
    @IsString()
    search!: string;

    @IsOptional()
    @IsInt()
    @IsPositive()
    limit!: number;

    @IsOptional()
    @IsInt()
    @IsPositive()
    offset!: number;
}

export class CreateMemberRequest {
    @IsString()
    @IsNotEmpty()
    firstName!: string;

    @IsString()
    @IsOptional()
    middleName?: string;

    @IsString()
    @IsNotEmpty()
    lastName!: string;

    @IsString()
    @IsEnum(MemberStatus)
    @IsNotEmpty()
    maritalStatus!: MaritalStatus;

    @IsString()
    @IsEnum(Gender)
    @IsNotEmpty()
    gender!: Gender;

    @IsString()
    @IsOptional()
    homeCell?: string;

    @IsDate()
    @IsNotEmpty()
    joinedUnitAt!: Date;

    @IsDate()
    @IsNotEmpty()
    joinedCommissionAt!: Date;

    @IsDate()
    @IsOptional()
    newBirthAt?: Date;

    @IsDate()
    @IsOptional()
    baptizedAt?: Date;

    @IsString()
    @IsNotEmpty()
    occupation!: string;

    @IsInt()
    @IsPositive()
    @Max(31)
    birthDay!: number;

    @IsInt()
    @IsPositive()
    @Max(12)
    birthMonth!: number;

    @IsNotEmpty()
    @IsPhoneNumber('NG')
    phoneNumber!: string;

    @IsNotEmpty()
    @IsString()
    address!: string;

    @IsOptional()
    @IsString()
    reference?: string;

    @IsNotEmpty()
    @IsString()
    qualification!: string;

    @IsOptional()
    @IsString()
    otherUnit?: string;

    @IsNotEmpty()
    @IsString()
    hobbies!: string;

    @IsNotEmpty()
    @IsString()
    nextOfKin!: string;

    @IsNotEmpty()
    @IsPhoneNumber('NG')
    nextOfKinNumber!: string;

    @IsNotEmpty()
    @IsString()
    village!: string;

    @IsNotEmpty()
    @IsString()
    homeTown!: string;

    @IsNotEmpty()
    @IsString()
    lga!: string;

    @IsNotEmpty()
    @IsString()
    state!: string;
}

export class CreateExternalMemberRequest {

    @IsNotEmpty()
    @IsString()
    firstName!: string;

    @IsOptional()
    @IsString()
    middleName?: string;

    @IsNotEmpty()
    @IsString()
    lastName!: string;

    @IsOptional()
    @IsString()
    unit?: string;

    @IsNotEmpty()
    @IsString()
    @IsEnum(ExternalMemberLabel)
    label!: ExternalMemberLabel;
}