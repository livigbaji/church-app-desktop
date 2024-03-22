import {Attendance} from "../models/attendance.model.ts";
import {ipcMain} from "@electron/remote";
import {endOfDay, startOfDay} from "date-fns";
import {ListAttendanceRequest, signInRequest, UserType} from "../types";
import IpcMainInvokeEvent = Electron.IpcMainInvokeEvent;


export class AttendanceService {
    constructor() {
        this.init()
    }

    init() {
        ipcMain.handle('get:attendance', async (_event: IpcMainInvokeEvent, request: ListAttendanceRequest) => {
            return this.listAttendance(request);
        });

        ipcMain.handle('signIn', async (_event: IpcMainInvokeEvent, request: signInRequest) => {
            return this.signIn(request);
        });

        ipcMain.handle('signOut', async (_event: IpcMainInvokeEvent, id: string) => {
            return this.signOut(id);
        });

        ipcMain.handle('forceSignOut', async (_event: IpcMainInvokeEvent, requestDate: Date) => {
            return this.forceSignOut(requestDate);
        });

        ipcMain.handle('attendanceStats', async (_event: IpcMainInvokeEvent, date: Date, isExternal: boolean) => {
            return this.attendanceStats(date, isExternal);
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
            position: request.position,
            timeIn: request.timeIn,
            status: request.status
        });
    }

    signOut(id: string) {
        return Attendance.query().patchAndFetchById(id, {
            timeOut: new Date()
        });
    }

    async forceSignOut(requestDate: Date) {
        const date = requestDate || new Date();
        await Attendance.query().patch({
            timeOut: new Date()
        }).whereBetween('timeIn', [startOfDay(date), endOfDay(date)])

        return true;
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