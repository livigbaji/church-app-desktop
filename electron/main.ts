import 'reflect-metadata'; // Required by TypoORM.
import { app, BrowserWindow } from 'electron'
import path from 'node:path'
import { initServices } from "../src/main/database.ts";
import {getSqlite3, runMigration} from "./db.ts";
import CreateAdminTable from "../src/main/migrations/create_admin_table.ts";
import CreateExternalsTable from "../src/main/migrations/create_external_members_table.ts";
import CreateAttendanceTable from "../src/main/migrations/create_attendace_table.ts";
import CreateUnitTable from "../src/main/migrations/create_unit_table.ts";
import CreateUnitPosition from "../src/main/migrations/create_unit_position.ts";
import CreateMembersTable from "../src/main/migrations/create_members_table.ts";

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  const db = getSqlite3('here.sqlite3');
  runMigration([
      CreateAdminTable,
      CreateExternalsTable,
      CreateAttendanceTable,
      CreateUnitTable,
      CreateUnitPosition,
      CreateMembersTable
  ]);
  initServices(db);
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      sandbox: false,
    },
  })


  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)
