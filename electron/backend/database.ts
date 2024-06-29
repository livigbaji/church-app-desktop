import knex from "knex";
import {initialize, Model} from "objection";
import {Member} from "./models/member.model";
import {MemberService} from "./services/member.service";
import {ExternalMembers} from "./models/external-member.model";
import {Admin} from "./models/admin.model";
import {Unit, UnitPosition} from "./models/unit.model";
import {AdminService} from "./services/admin.service";
import { Attendance } from "./models/attendance.model";
import {AttendanceService} from "./services/attendance.service";
import {UnitService} from "./services/unit.service";


export default async () => {
    const knexInstance = knex({
        client: 'better-sqlite3',
        useNullAsDefault: true,
        connection: {
            filename: "./dev.sqlite3",
        },
        migrations: {
            directory: 'electron/backend/migrations',
            extension: '.cjs',
        }
    })
    await knexInstance.migrate.latest()
    Model.knex(knexInstance);
    await initialize( [Member, ExternalMembers, Admin, Attendance, Unit, UnitPosition]);
    const services = [MemberService, AdminService, AttendanceService, UnitService];
    services.forEach(service => new service())
}