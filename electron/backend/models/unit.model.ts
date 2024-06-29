import {Model, snakeCaseMappers} from "objection";
import {UNIT_POSITION_TABLE, UNIT_TABLE} from "../configs/constants";


export class Unit extends Model {
    static idColumn = 'id';
    static get tableName() {
        return UNIT_TABLE
    }

    static get columnNameMappers() {
        return snakeCaseMappers();
    }
    id!: string;

    leader!: string;
    name!: string;
    description!: string;
    deleted?: boolean;
    deletedAt?: Date;
    createdAt!: Date;
    updatedAt!: Date;
}

export class UnitPosition extends Model {
    static idColumn = 'id';
    static get tableName() {
        return UNIT_POSITION_TABLE
    }

    static get columnNameMappers() {
        return snakeCaseMappers();
    }
    id!: string;

    group!: string;
    name!: string;
    description!: string;
    deleted?: boolean;
    deletedAt?: Date;
    createdAt!: Date;
    updatedAt!: Date;
}