import {Repository} from "typeorm";
import {Attendance} from "../models/attendance.model.ts";
import {ipcMain} from "@electron/remote";


export class AttendanceService {
    constructor(
        private readonly attendanceRepo: Repository<Attendance>
    ) {
        this.init()
    }

    init() {
        ipcMain.handle('get-attendance', async () => {
            return this.attendanceRepo.find()
        });
    }
}