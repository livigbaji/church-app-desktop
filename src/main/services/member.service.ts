import {Repository} from "typeorm";
import {ipcMain} from "@electron/remote";
import {Member} from "../models/member.model.ts";
import {ExternalMembers} from "../models/external-members.model.ts";

export class MemberService {
    constructor(
        private readonly memberRepo: Repository<Member>,
        private readonly externalMemberRepo: Repository<ExternalMembers>
    ) {
        this.init()
    }

    init() {
        ipcMain.handle('get:members',  () => {
            return this.memberRepo.find()
        });

        ipcMain.handle('get:external-members',  () => {
            return this.externalMemberRepo.find()
        });
    }
}