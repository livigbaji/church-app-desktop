import {ExternalMemberLabel} from "../types";
import {Model, snakeCaseMappers} from "objection";
import {EXTERNALS_TABLE} from "../configs/constants.ts";


export class ExternalMembers extends Model {
    static idColumn = 'id';
    static get tableName() {
        return EXTERNALS_TABLE
    }

    static get columnNameMappers() {
        return snakeCaseMappers();
    }
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