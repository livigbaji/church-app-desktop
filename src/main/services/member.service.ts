import {FindManyOptions, Like, Repository} from "typeorm";
import {ipcMain} from "@electron/remote";
import {Member} from "../models/member.model.ts";
import {ExternalMembers} from "../models/external-members.model.ts";
import {ListMembersRequest} from "../types";

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

    listMembers(request: ListMembersRequest) {
        const query = {
            where: [
                { firstName: Like(`%${request.search}%`) },
                { middleName: Like(`%${request.search}%`) },
                { lastName: Like(`%${request.search}%`) }
            ]
        } as FindManyOptions<Member|ExternalMembers>

        const model = request.isExternal ? this.externalMemberRepo : this.memberRepo;

        return model.find(query)
    }


}