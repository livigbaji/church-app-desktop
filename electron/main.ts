import 'reflect-metadata'; // Required by TypoORM.
import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import { initServices } from "../src/main/database";
import { getSqlite3, runMigration } from "./db";
import CreateAdminTable from "../src/main/migrations/create_admin_table";
import CreateExternalsTable from "../src/main/migrations/create_external_members_table";
import CreateAttendanceTable from "../src/main/migrations/create_attendace_table";
import CreateUnitTable from "../src/main/migrations/create_unit_table";
import CreateUnitPosition from "../src/main/migrations/create_unit_position";
import CreateMembersTable from "../src/main/migrations/create_members_table";

process.env.DIST = path.join(__dirname, '../dist');
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public');

let win: BrowserWindow | null;
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];

function createWindow() {
  const db = getSqlite3('here.sqlite3');
  runMigration([
    CreateAdminTable,
    CreateExternalsTable,
    CreateAttendanceTable,
    CreateUnitTable,
    CreateUnitPosition,
    CreateMembersTable,
  ]);
  initServices(db);
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      sandbox: false,
    },
  });

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(process.env.DIST, 'index.html'));
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    win = null;
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);
