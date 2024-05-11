import { ADMIN_TABLE } from "../configs/constants.ts";

export default class CreateAdminTable {
    static name: string = "20240310202540_create_admin_table";

    static up(): string {
        return `
        CREATE TABLE ${ADMIN_TABLE} (
            id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))), 2) || '-' || substr('89ab', 1 + (abs(random()) % 4) , 1) || substr(lower(hex(randomblob(2))), 2) || '-' || lower(hex(randomblob(6)))),
            pin TEXT,
            deleted INTEGER DEFAULT 0,
            deleted_at TEXT DEFAULT (datetime('now', 'localtime')),
            updated_at TEXT DEFAULT (datetime('now', 'localtime'))
        );
        `;
    }

    static down(): string {
        return `DROP TABLE IF EXISTS ${ADMIN_TABLE};`;
    }
}
