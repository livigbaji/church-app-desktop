import {IsNotEmpty, IsOptional, IsString, IsUUID} from "class-validator";

export class CreateUnit {

    @IsOptional()
    @IsUUID()
    leader?: string;

    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsString()
    description!: string;
}

export class CreateUnitPosition {

    @IsUUID()
    @IsNotEmpty()
    @IsString()
    group!: string;

    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsString()
    description!: string;
}