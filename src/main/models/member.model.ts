import {Gender, MaritalStatus, MemberStatus} from "../types";

export class Member {
    id!: string;
    firstName!: string;
    middleName?: string;
    lastName!: string;
    maritalStatus!: MaritalStatus;
    gender!: Gender;
    homeCell?: string;
    joinedUnitAt!: Date;
    joinedCommissionAt!: Date;
    newBirthAt?: Date;
    baptizedAt?: Date;
    occupation!: string;
    birthDay!: number;
    birthMonth!: number;
    phoneNumber!: string;
    address!: string;
    reference?: string;
    qualification!: string;
    otherUnit?: string;
    hobbies!: string;
    nextOfKin!: string;
    nextOfKinNumber!: string;
    village!: string;
    homeTown!: string;
    lga!: string;
    state!: string;
    status!: MemberStatus;
    suspensionDescription?: string;
    suspendedAt?: Date | null;
    deleted!: boolean;
    deletedAt?: Date;
    createdAt!: Date;
    updatedAt!: Date;
}