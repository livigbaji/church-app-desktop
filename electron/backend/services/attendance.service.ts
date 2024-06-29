import {Attendance} from "../models/attendance.model";
import {endOfDay, startOfDay} from "date-fns";
import {ListAttendanceRequest, signInRequest, UserType} from "../types";
import {Handler} from "../handler";


export class AttendanceService {
    @Handler('get:attendance')
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

    @Handler('signIn')
    signIn(request: signInRequest) {
        return Attendance.query().insert({
            userType: request.isExternal ? UserType.EXTERNAL : UserType.MEMBER,
            user: request.user,
            position: request.position,
            timeIn: request.timeIn,
            status: request.status
        });
    }

    @Handler('signOut')
    signOut(id: string) {
        return Attendance.query().patchAndFetchById(id, {
            timeOut: new Date()
        });
    }

    @Handler('forceSignOut')
    async forceSignOut(requestDate: Date) {
        const date = requestDate || new Date();
        await Attendance.query().patch({
            timeOut: new Date()
        }).whereBetween('timeIn', [startOfDay(date), endOfDay(date)])

        return true;
    }

    @Handler('attendanceStats')
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