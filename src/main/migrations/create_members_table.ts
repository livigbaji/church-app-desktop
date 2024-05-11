import { MEMBERS_TABLE } from "../configs/constants.ts";

export default class CreateMembersTable {
    static name: string = "20240309221453_create_members_table";

    static up(): string {
        return `
        CREATE TABLE ${MEMBERS_TABLE} (
            id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))), 2) || '-' || substr('89ab', 1 + (abs(random()) % 4) , 1) || substr(lower(hex(randomblob(2))), 2) || '-' || lower(hex(randomblob(6)))),
            first_name TEXT,
            middle_name TEXT,
            last_name TEXT,
            marital_status TEXT,
            gender TEXT,
            status TEXT,
            inactive_at TEXT,
            suspended_at TEXT,
            home_cell TEXT,
            joined_unit_at TEXT,
            joined_commission_at TEXT,
            new_birth_at TEXT,
            baptized_at TEXT,
            occupation TEXT,
            birth_month INTEGER,
            birth_day INTEGER,
            phone_number TEXT,
            address TEXT,
            reference TEXT,
            qualification TEXT,
            other_unit TEXT,
            hobbies TEXT,
            next_of_kin_name TEXT,
            next_of_kin_number TEXT,
            village TEXT,
            home_town TEXT,
            lga TEXT,
            state TEXT,
            deleted INTEGER DEFAULT 0,
            deleted_at TEXT,
            created_at TEXT DEFAULT (datetime('now', 'localtime')),
            updated_at TEXT DEFAULT (datetime('now', 'localtime'))
        );
        `;
    }

    static down(): string {
        return `DROP TABLE IF EXISTS ${MEMBERS_TABLE};`;
    }
}
