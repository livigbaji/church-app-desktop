import {Repository} from "typeorm";
import {ipcMain} from "@electron/remote";
import {Member} from "../models/member.model.ts";

export class MemberService {
    constructor(
        private readonly memberRepo: Repository<Member>
    ) {
        this.init()
    }

    init() {
        ipcMain.handle('get:members', async () => {
            return this.memberRepo.find()
        });
    }
}