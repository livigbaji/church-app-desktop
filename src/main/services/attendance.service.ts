import {Attendance} from "../models/attendance.model.ts";
import {ipcMain} from "electron";
import {endOfDay, startOfDay} from "date-fns";
import {ListAttendanceRequest, signInRequest, UserType} from "../types";
import IpcMainInvokeEvent = Electron.IpcMainInvokeEvent;
import {Database} from "better-sqlite3";
import {MEMBERS_TABLE} from "../configs/constants.ts";


export class AttendanceService {
    private readonly db: Database;

    constructor(
        private readonly db: Database
    ) {
        this.init()
    }

    init() {
        ipcMain.handle('doStuff', async (_event: IpcMainInvokeEvent, name: string, password: string) => {
                return this.handleStuff(name, password);
        });

        // ipcMain.handle('get:attendance', async (_event: IpcMainInvokeEvent, request: ListAttendanceRequest) => {
        //     return this.listAttendance(request);
        // });
        //
        // ipcMain.handle('signIn', async (_event: IpcMainInvokeEvent, request: signInRequest) => {
        //     return this.signIn(request);
        // });
        //
        // ipcMain.handle('signOut', async (_event: IpcMainInvokeEvent, id: string) => {
        //     return this.signOut(id);
        // });
        //
        // ipcMain.handle('forceSignOut', async (_event: IpcMainInvokeEvent, requestDate: Date) => {
        //     return this.forceSignOut(requestDate);
        // });
        //
        // ipcMain.handle('attendanceStats', async (_event: IpcMainInvokeEvent, date: Date, isExternal: boolean) => {
        //     return this.attendanceStats(date, isExternal);
        // });
    }

    async handleStuff(name: string, password: string): Promise<Record<string, string>> {
        return Promise.resolve({
            name,
            password,
            message: 'Handled by the backend'
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