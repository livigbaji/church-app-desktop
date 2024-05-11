import { app } from 'electron'
import path from 'node:path'
import Database from 'better-sqlite3'
import {DBMigration} from "../src/main/types";
import {camelCase, differenceWith} from 'lodash';

const root = path.join(__dirname, '..')
// const TAG = '[better-sqlite3]'
let database: Database.Database

export function getSqlite3(filename = path.join(app.getPath('userData'), 'dev.sqlite3')) {
    return database ??= new Database(filename, {
        // https://github.com/WiseLibs/better-sqlite3/blob/v8.5.2/lib/database.js#L36
        // https://github.com/WiseLibs/better-sqlite3/blob/v8.5.2/lib/database.js#L50
        verbose: console.log,
        nativeBinding: path.join(root, import.meta.env.VITE_BETTER_SQLITE3_BINDING),
    })
}

export const runMigration = async (migrations: DBMigration[]) => {
    const migrationTableQuery = `CREATE TABLE IF NOT EXISTS migrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        runOrder INTEGER UNIQUE NOT NULL,
        createdAt TIMESTAMP DEFAULT (datetime('now', 'localtime'))
    )`

    database.exec(migrationTableQuery);

    if(!migrations.length) {
        console.log('No migration available to run');
        return;
    }

    const doneMigrations = database.prepare<{}, {name: string; runOrder: number}>(`SELECT name, runOrder FROM migrations ORDER BY createdAt DESC`).all();

    console.log(doneMigrations);
    const configMigration = migrations.map((mig) => {
        const [runOrder] = mig.name.split('_')
        return {
            name: camelCase(mig.name.slice(runOrder.length + 1)),
            runOrder: Number(runOrder),
            up: () => mig.up()
        }
    }).sort((a, b) => a.runOrder - b.runOrder);

    const prepped = differenceWith(configMigration, doneMigrations, (a, b) => {
        return a.name === b.name && b.runOrder === b.runOrder;
    });

    if(!prepped.length) {
        console.log('No new migration available to run, all migrations done');
        return;
    }

    let failed = 0;
    let success = 0;


    for(const migration of prepped) {
        try {
            database.exec(migration.up());
            database.exec(`INSERT INTO migrations(name, runOrder) VALUES ('${migration.name}', ${migration.runOrder})`);
            success += 1;
        } catch(e) {
            console.log(e);
            failed += 1;
            // rollback
        }

    }

    console.log(`Migration done. Success ${success} | failed: ${failed} | total: ${prepped.length}`);
}