import {Repository} from "typeorm";
import {Attendance} from "../models/attendance.model.ts";


export class AttendanceService {
    constructor(
        private readonly attendanceRepo: Repository<Attendance>
    ) {
    }

    getAttendance() {
        return this.attendanceRepo.find();
    }
}