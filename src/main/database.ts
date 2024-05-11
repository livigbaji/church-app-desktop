import {AttendanceService} from "./services/attendance.service";
import {UnitService} from './services/unit.service.ts';
import { Database } from 'better-sqlite3'
import {AdminService} from "./services/admin.service.ts";
import {MemberService} from "./services/member.service.ts";

class AppService {
    readonly adminService: AdminService;
    readonly memberService: MemberService;
    readonly unitService: UnitService;
    readonly attendanceService: AttendanceService;
    constructor(db: Database) {
        this.adminService = new AdminService(db);
        this.memberService = new MemberService(db);
        this.unitService = new UnitService(db);
        this.attendanceService = new AttendanceService(db);
    }
}

let appService: AppService;

export const initServices = (db: Database) => {
    return appService ??= new AppService(db);
}

export const existingServices = () => {
    return appService;
}