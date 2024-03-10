import {ipcMain} from "@electron/remote";
import {Member} from "../models/member.model.ts";
import {Admin} from "../models/admin.model.ts";
import { createHash } from 'crypto';

export class AdminService {
    constructor() {
        this.init()
    }

    private hash(inputString: string) {
        return createHash('md5').update(inputString).digest("hex")
    }

    init() {
        ipcMain.handle('login', async () => {
            return [] // this.login()
        });
    }

    async login(phone: string, pin: string) {
        const member = await Member.query().where({
            phoneNumber: phone
        }).first();

        if(!member) {
            return Promise.reject('incorrect phone number');
        }

        const admin = await Admin.query().where({
            user: member.id
        }).first();

        if(!admin) {
            return Promise.reject('incorrect phone number');
        }

        if(this.hash(pin) != admin.pin) {
            return Promise.reject('incorrect pin');
        }

        return member;
    }


}