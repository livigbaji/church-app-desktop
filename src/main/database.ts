import {AttendanceService} from "./services/attendance.service";
import {MemberService} from "./services/member.service";
import {Attendance} from "./models/attendance.model";
import {Member} from "./models/member.model";
import {ExternalMembers} from "./models/external-members.model.ts";
import {initialize} from "objection";
import knex from 'knex';


let db: Database
export class Database {
    public attendance: AttendanceService;
    public members: MemberService;

    constructor() {
        void this.init();
        this.attendance = new AttendanceService();
        this.members = new MemberService();
    }

    async  init() {

        const knexInstance = knex({
            client: 'sqlite3',
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