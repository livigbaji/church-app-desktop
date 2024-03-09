import {ipcMain} from "@electron/remote";
import {Member} from "../models/member.model.ts";
import {ExternalMembers} from "../models/external-members.model.ts";
import {ListMembersRequest, MemberStatus} from "../types";

export class MemberService {
    constructor() {
        this.init()
    }

    init() {
        ipcMain.handle('get:members',  () => {
            return [] // this.listMembers();
        });

        ipcMain.handle('get:external-members',  () => {
            return [] // this.listExternalMembers();
        });
    }

    listMembers(request: ListMembersRequest) {
        return  Member.query()
            .whereILike('firstName', `%${request.search}%`)
            .orWhereILike('middleName', `%${request.search}%`)
            .orWhereILike('lastName', `%${request.search}%`)
            .orderBy('firstName')
            .limit(request.limit || 500)
            .offset(request.offset || 0)

    }

    listExternalMembers(request: ListMembersRequest) {
        return  ExternalMembers.query()
            .whereILike('firstName', `%${request.search}%`)
            .orWhereILike('middleName', `%${request.search}%`)
            .orWhereILike('lastName', `%${request.search}%`)
            .orderBy('firstName')
            .limit(request.limit || 500)
            .offset(request.offset || 0)
    }

    createMember(member: Partial<Member>) {
        return Member.query().insert(member);
    }

    updateMember(id: string, member: Partial<Member>) {
        return Member.query().findById(id).patch(member)
    }

    createExternalMember(member: Partial<ExternalMembers>) {
        return ExternalMembers.query().insert(member);
    }

    updateExternalMember(id: string, member: Partial<ExternalMembers>) {
        return ExternalMembers.query().findById(id).patch(member)
    }

    deleteMember(id: string) {
        return Member.query().deleteById( id );
    }

    deleteExternalMember(id: string) {
        return ExternalMembers.query().deleteById( id );
    }

    suspendMember(id: string, note: string) {
        return Member.query().findById(id).patchAndFetch({
            status: MemberStatus.SUSPENDED,
            suspensionDescription: note,
            suspendedAt: new Date(),
        })
    }

    unsuspend(id: string) {
        return Member.query().findById(id).patchAndFetch({
            status:  MemberStatus.ACTIVE,
            suspendedAt: null,
        });
    }

    birthdays(month: number) {
        return Member.query().where({
                birthMonth: month,
                status:  MemberStatus.ACTIVE,
        })
            .orderBy('birthDate');
    }
}