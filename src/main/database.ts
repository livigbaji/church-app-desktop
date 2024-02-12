import {DataSource} from "typeorm";
import {AttendanceService} from "./services/attendance.service.ts";
import {Attendance} from "./models/attendance.model.ts";
import {AppDataSource} from "./datasource.ts";


export default class Database {
    public attendance: AttendanceService;
    private connection: DataSource = AppDataSource;

    constructor() {
        void this.init();
        this.attendance = new AttendanceService(
            this.connection.getRepository(Attendance)
        );
    }

    async  init() {
        if(!this.connection || !this.connection.isInitialized) {
            this.connection = await AppDataSource.initialize();
        }
    }
}