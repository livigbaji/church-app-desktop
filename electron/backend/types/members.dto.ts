import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsPositive,
  IsString,
  Max, ValidateNested,
} from "class-validator";
import {
  ExternalMemberLabel,
  Gender,
  MaritalStatus,
} from "./common.type";

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
  @IsEnum(MaritalStatus)
  @IsNotEmpty()
  maritalStatus!: MaritalStatus;

  @IsString()
  @IsEnum(Gender)
  @IsNotEmpty()
  gender!: Gender;

  @IsString()
  @IsOptional()
  homeCell?: string;

  @IsDateString()
  @IsNotEmpty()
  joinedUnitAt!: Date;

  @IsDateString()
  @IsNotEmpty()
  joinedCommissionAt!: Date;

  @IsDateString()
  @IsOptional()
  newBirthAt?: Date;

  @IsDateString()
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
  @IsPhoneNumber("NG")
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
  nextOfKinName!: string;

  @IsNotEmpty()
  @IsPhoneNumber("NG")
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


export class MembersUpload {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({
    each: true,
  })
  members!: CreateMemberRequest[];
}
