import {AttendanceStatus, UserType} from "../types";

export class Attendance{
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