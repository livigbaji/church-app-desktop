import {ExternalMemberLabel} from "../types";

export class ExternalMembers {
    id!: string;

    firstName!: string;
    middleName?: string;
    lastName!: string;
    unit?: string;
    label!: ExternalMemberLabel;
    deleted?: boolean;
    deletedAt?: Date;
    createdAt!: Date;
    updatedAt!: Date;
}