import { EXTERNALS_TABLE } from "../configs/constants.ts";

export default class ExternalsTable {
    static name: string = "20240309221501";

    static up(): string {
        return `
        CREATE TABLE ${EXTERNALS_TABLE} (
            id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))), 2) || '-' || substr('89ab', 1 + (abs(random()) % 4) , 1) || substr(lower(hex(randomblob(2))), 2) || '-' || lower(hex(randomblob(6)))),
            first_name TEXT,
            middle_name TEXT,
            last_name TEXT,
            unit TEXT,
            label TEXT,
            deleted INTEGER DEFAULT 0,
            deleted_at TEXT DEFAULT (datetime('now', 'localtime')),
            updated_at TEXT DEFAULT (datetime('now', 'localtime'))
        );
        `;
    }

    static down(): string {
        return `DROP TABLE IF EXISTS ${EXTERNALS_TABLE};`;
    }
}
