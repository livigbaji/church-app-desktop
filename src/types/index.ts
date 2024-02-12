import Database from '../main/database';

declare global {
    namespace NodeJS {
        interface Global {
            database: Database;
            ipcRenderer: import('electron').IpcRenderer;
        }
    }
}