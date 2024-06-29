import {Model, snakeCaseMappers} from 'objection';
import {ATTENDANCE_TABLE} from "../configs/constants";
import {AttendanceStatus, UserType} from "../types";


export class Attendance extends Model {
    static idColumn = 'id';
    static get tableName() {
        return ATTENDANCE_TABLE
    }

    static get columnNameMappers() {
        return snakeCaseMappers();
    }

    id!: string;
    user!: string;
    userType!: UserType;
    position?: string;
    timeIn!: Date;
    timeOut?: Date;
    status!: AttendanceStatus;
    deleted?: boolean;
    deletedAt?: Date;
    createdAt!: Date;
    updatedAt!: Date;
}