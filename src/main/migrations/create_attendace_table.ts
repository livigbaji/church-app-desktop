import { ATTENDANCE_TABLE } from "../configs/constants.ts";

export default class AttendanceTable {
    static name: string = "20240309221513";

    static up(): string {
        return `
        CREATE TABLE ${ATTENDANCE_TABLE} (
            id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))), 2) || '-' || substr('89ab', 1 + (abs(random()) % 4) , 1) || substr(lower(hex(randomblob(2))), 2) || '-' || lower(hex(randomblob(6)))),
            user_type TEXT,
            duty_post TEXT,
            time_in TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            time_out TIMESTAMP DEFAULT NULL,
            status TEXT,
            deleted INTEGER DEFAULT 0,
            deleted_at TEXT DEFAULT (datetime('now', 'localtime')),
            updated_at TEXT DEFAULT (datetime('now', 'localtime'))
        );
        `;
    }

    static down(): string {
        return `DROP TABLE IF EXISTS ${ATTENDANCE_TABLE};`;
    }
}
