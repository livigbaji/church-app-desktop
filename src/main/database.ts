import {DataSource} from "typeorm";
import {AttendanceService} from "./services/attendance.service";
import {MemberService} from "./services/member.service";
import {Attendance} from "./models/attendance.model";
import {AppDataSource} from "./datasource";
import {Member} from "./models/member.model";
import {ExternalMembers} from "./models/external-members.model.ts";

let db: Database
export class Database {
    public attendance: AttendanceService;
    public members: MemberService;
    private connection: DataSource = AppDataSource;

    constructor() {
        void this.init();
        this.attendance = new AttendanceService(
            this.connection.getRepository(Attendance)
        );

        this.members = new MemberService(
            this.connection.getRepository(Member),
            this.connection.getRepository(ExternalMembers),
        );
    }

    async  init() {
        if(!this.connection || !this.connection.isInitialized) {
            this.connection = await AppDataSource.initialize();
        }
    }
}

export const initDB = () => {
    if(!db) {
        db = new Database()
    }

    return db;
}