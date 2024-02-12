import {Attendance} from "./models/attendance.model.ts";
import {DataSource} from "typeorm";
import {CreateMembersTable1707605987025} from "./migrations/1707605987025-create_members_table.ts";
import {CreateAttendanceTable1707664352943} from "./migrations/1707664352943-create_attendance_table.ts";
import {CreateExternalsTable1707664004579} from "./migrations/1707664004579-create_externals_table.ts";
import {ExternalMembers} from "./models/external-members.model.ts";
import {Member} from "./models/member.model.ts";
import path from "path";


export const AppDataSource = new DataSource({
    type: "sqlite",
    database: path.join(__dirname, 'church'),
    migrationsRun: true,
    logging: true,
    entities: [Attendance, ExternalMembers, Member],
    migrations: [CreateMembersTable1707605987025, CreateExternalsTable1707664004579, CreateAttendanceTable1707664352943],
})