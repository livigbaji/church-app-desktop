import {ipcMain} from "electron";
import IpcMainInvokeEvent = Electron.IpcMainInvokeEvent;


export function Handler(event: string, useInvokeEvent = false) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        ipcMain.handle(event,  (_event: IpcMainInvokeEvent, ...args) => {
            const extraArgs = useInvokeEvent ? [_event] : [];
            return target[propertyKey].apply(target, extraArgs.concat(args));
        });
    }
}