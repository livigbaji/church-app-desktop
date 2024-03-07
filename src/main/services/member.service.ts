import {FindManyOptions, Like, Repository} from "typeorm";
import {ipcMain} from "@electron/remote";
import {Member} from "../models/member.model.ts";
import {ExternalMembers} from "../models/external-members.model.ts";
import {ListMembersRequest, MemberStatus} from "../types";

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

    createMember(member: Partial<Member>) {
        return this.memberRepo.save(this.memberRepo.create(member));
    }

    updateMember(id: string, member: Partial<Member>) {
        return this.memberRepo.update({
            id,
        }, member)
    }

    createExternalMember(member: Partial<ExternalMembers>) {
        return this.externalMemberRepo.save(this.externalMemberRepo.create(member));
    }

    updateExternalMember(id: string, member: Partial<ExternalMembers>) {
        return this.externalMemberRepo.update({
            id,
        }, member)
    }

    deleteMember(id: string, isExternal: boolean) {
        const model = isExternal ? this.externalMemberRepo : this.memberRepo;

        return model.delete({ id });
    }

    suspendMember(id: string, note: string) {
        return this.memberRepo.update({
            id,
        }, {
            status: MemberStatus.SUSPENDED,
            suspensionDescription: note,
            suspendedAt: new Date(),
        })
    }

    unsuspend(id: string) {
        return this.memberRepo.update({
            id,
        }, {
            status:  MemberStatus.ACTIVE,
            suspendedAt: null,
        });
    }

    birthdays(month: number) {
        return this.memberRepo.find({
            where: {
                birthMonth: month
            }
        });
    }
}