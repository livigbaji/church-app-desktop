import { UNIT_POSITION_TABLE } from "../configs/constants.ts";

export default class UnitPosition {
    static name: string = "20240313205358";

    static up(): string {
        return `
        CREATE TABLE ${UNIT_POSITION_TABLE} (
            id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))), 2) || '-' || substr('89ab', 1 + (abs(random()) % 4) , 1) || substr(lower(hex(randomblob(2))), 2) || '-' || lower(hex(randomblob(6)))),
            unit TEXT,
            name TEXT,
            description TEXT,
            deleted INTEGER DEFAULT 0,
            deleted_at TEXT,
            created_at TIMESTAMP DEFAULT (datetime('now', 'localtime')),
            updated_at TIMESTAMP DEFAULT (datetime('now', 'localtime'))
        );
        `;
    }

    static down(): string {
        return `DROP TABLE IF EXISTS ${UNIT_POSITION_TABLE};`;
    }
}
