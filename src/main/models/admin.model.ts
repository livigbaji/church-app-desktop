import {Model, snakeCaseMappers} from 'objection';
import {ADMIN_TABLE} from "../configs/constants.ts";


export class Admin extends Model {
    static idColumn = 'id';
    static get tableName() {
        return ADMIN_TABLE
    }

    static get columnNameMappers() {
        return snakeCaseMappers();
    }

    id!: string;
    user!: string;
    pin!: string;
    deleted?: boolean;
    deletedAt?: Date;
    createdAt!: Date;
    updatedAt!: Date;
}