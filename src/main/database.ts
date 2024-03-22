import {AttendanceService} from "./services/attendance.service";
import {MemberService} from "./services/member.service";
import {Attendance} from "./models/attendance.model";
import {Member} from "./models/member.model";
import {ExternalMembers} from "./models/external-members.model.ts";
import {initialize} from "objection";
import knex from 'knex';
import {AdminService} from "./services/admin.service.ts";
import {UnitService} from './services/unit.service.ts';


let db: Database
export class Database {
    public attendance: AttendanceService;
    public members: MemberService;
    public admin: AdminService;
    public unit: UnitService;

    constructor() {
        void this.init();
        this.attendance = new AttendanceService();
        this.members = new MemberService();
        this.admin = new AdminService();
        this.unit = new UnitService();
    }

    async  init() {

        const knexInstance = knex({
            client: 'better-sqlite3',
            useNullAsDefault: true,
            connection: {
                filename: "./dev.sqlite3",
            }
        })
        await initialize(knexInstance, [Member, ExternalMembers, Attendance]);
    }
}

export const initDB = () => {
    if(!db) {
        db = new Database()
    }

    return db;
}