import {Attendance} from "./models/attendance.model.ts";
import {DataSource} from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: true,
    entities: [Attendance],
    subscribers: [],
    migrations: [],
})