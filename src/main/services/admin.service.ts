import { ipcMain } from "@electron/remote";
import { Member } from "../models/member.model.ts";
import { Admin } from "../models/admin.model.ts";
import { createHash } from 'crypto';
import IpcMainInvokeEvent = Electron.IpcMainInvokeEvent;
import { ipcRenderer } from "electron";

export class AdminService {
    constructor() {
        this.init()
    }

    private hash(inputString: string) {
        return createHash('md5').update(inputString).digest("hex")
    }

    init() {
        ipcMain.handle('login', async (_event: IpcMainInvokeEvent, phone: string, pin: string) => {
            return this.login(phone, pin);
        });

        ipcMain.handle('makeAdmin', async (_event: IpcMainInvokeEvent, user: string) => {
            return this.makeAdmin(user);
        });

        ipcMain.handle('changePin', async (_event: IpcMainInvokeEvent, user: string, oldPin: string, newPin: string) => {
            return this.changePin(user, oldPin, newPin);
        });

        ipcMain.handle('suspendAdmin', async (_event: IpcMainInvokeEvent, user: string) => {
            return this.suspendAdmin(user);
        });

        ipcMain.handle('listAdmins', async () => {
            return this.listAdmins();
        });
    }

    async login(phone: string, pin: string) {
        const member = await Member.query().where({
            phoneNumber: phone
        }).first();

        if (!member) {
            return Promise.reject('incorrect phone number');
        }

        const admin = await Admin.query().where({
            user: member.id
        }).first();

        if (!admin) {
            return Promise.reject('incorrect phone number');
        }

        if (this.hash(pin) != admin.pin) {
            return Promise.reject('incorrect pin');
        }

        return member;
    }

    async makeAdmin(user: string) {
        const member = await Member.query().where({
            id: user
        }).first();

        if (!member) {
            return Promise.reject('member does not exist');
        }

        const admin = await Admin.query().where({
            user: member.id
        }).first();

        if (admin) {
            return Promise.reject('user is already an admin');
        }

        return Admin.query().insert({
            user,
            pin: this.hash('0000'),
        })
    }

    async changePin(user: string, oldPin: string, newPin: string) {
        const member = await Member.query().where({
            id: user
        }).first();

        if (!member) {
            return Promise.reject('member does not exist');
        }

        const admin = await Admin.query().where({
            user: member.id
        }).first();

        if (!admin) {
            return Promise.reject('admin profile does not exist');
        }

        if (this.hash(oldPin) != admin.pin) {
            return Promise.reject('incorrect pin');
        }

        await Admin.query().where({
            user: member.id
        }).patch({
            pin: this.hash(newPin)
        })


        return true;
    }

    suspendAdmin(user: string) {
        return Admin.query().where({
            user,
        }).delete()
    }

    listAdmins() {
        return Admin.query();
    }


}

export const AdminAPI = {
    login: (phone: string, pin: string) => ipcRenderer.invoke('login', phone, pin),
    makeAdmin: (user: string) => ipcRenderer.invoke('makeAdmin', user),
    changePin: (user: string, oldPin: string, newPin: string) => ipcRenderer.invoke('changePin', user, oldPin, newPin),
    suspendAdmin: (user: string) => ipcRenderer.invoke('suspendAdmin', user),
    listAdmins: () => ipcRenderer.invoke('listAdmins'),
}