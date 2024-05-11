import { UNIT_TABLE } from "../configs/constants.ts";


export default class CreateUnitTable {
    static name: string = "20240313205126_create_unit_table";

    static up(): string {
        return `
        CREATE TABLE ${UNIT_TABLE} (
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
        return `DROP TABLE IF EXISTS ${UNIT_TABLE};`;
    }
}


