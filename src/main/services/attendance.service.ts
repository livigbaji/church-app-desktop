import {Between, Repository} from "typeorm";
import {Attendance} from "../models/attendance.model.ts";
import {ipcMain} from "@electron/remote";
import {endOfDay, startOfDay} from "date-fns";
import {AttendanceStatus, ListAttendanceRequest, signInRequest, UserType} from "../types";


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

    listAttendance(request: ListAttendanceRequest) {
        const date = request.date || new Date();
        return this.attendanceRepo.find({
            where: {
                timeIn: Between(startOfDay(date), endOfDay(date)),
                userType: request.isExternal ? UserType.EXTERNAL : UserType.MEMBER
            },
            skip: request.offset || 0,
            take: request.limit || 500,
            // polymorphic relationship
        });
    }

    signIn(request: signInRequest) {
        return this.attendanceRepo.save(
            this.attendanceRepo.create({
                userType: request.isExternal ? UserType.EXTERNAL : UserType.MEMBER,
                user: request.user,
                timeIn: request.timeIn,
                status: request.status,
            })
        );
    }

    signOut(id: string) {
        return this.attendanceRepo.update({ id }, {
            timeOut: new Date()
        })
    }

    attendanceStats(date: Date, isExternal: boolean) {
        return this.attendanceRepo.createQueryBuilder()
            .select('COUNT(1)', 'memberCount')
            .addSelect('status')
            .where({
                userType: isExternal ? UserType.EXTERNAL : UserType.MEMBER,
                timeIn: Between(startOfDay(date), endOfDay(date)),
            })
            .groupBy('status')
            .getRawMany<{memberCount: number; status: AttendanceStatus}>()
    }
}