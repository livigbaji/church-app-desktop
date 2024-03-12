import {Attendance} from "../models/attendance.model.ts";
import {ipcMain} from "@electron/remote";
import {endOfDay, startOfDay} from "date-fns";
import {ListAttendanceRequest, signInRequest, UserType} from "../types";


export class AttendanceService {
    constructor() {
        this.init()
    }

    init() {
        ipcMain.handle('get-attendance', async () => {
            return [] // this.attendanceRepo.find()
        });
    }

    listAttendance(request: ListAttendanceRequest) {
        const date = request.date || new Date();
        return Attendance.query()
            .whereBetween('timeIn', [startOfDay(date), endOfDay(date)])
            .andWhere({
            userType: request.isExternal ? UserType.EXTERNAL : UserType.MEMBER
            })
            .limit(request.limit || 500)
            .offset(request.offset || 0);
    }

    signIn(request: signInRequest) {
        return Attendance.query().insert({
            userType: request.isExternal ? UserType.EXTERNAL : UserType.MEMBER,
            user: request.user,
            timeIn: request.timeIn,
            status: request.status
        });
    }

    signOut(id: string) {
        return Attendance.query().patchAndFetchById(id, {
            timeOut: new Date()
        });
    }

    attendanceStats(date: Date, isExternal: boolean) {
        return Attendance.query()
            .select(['status', ['COUNT(1)', 'memberCount']])
            .whereBetween('timeIn', [startOfDay(date), endOfDay(date)])
            .andWhere({
                userType: isExternal ? UserType.EXTERNAL : UserType.MEMBER,
            })
            .groupBy('status')
    }
}