import {ipcMain} from "@electron/remote";
import {Member} from "../models/member.model.ts";
import {ExternalMembers} from "../models/external-members.model.ts";
import {ListMembersRequest, MemberStatus} from "../types";
import IpcMainInvokeEvent = Electron.IpcMainInvokeEvent;

export class MemberService {
    constructor() {
        this.init()
    }

    init() {
        ipcMain.handle('get:members',  (_event: IpcMainInvokeEvent, request: ListMembersRequest) => {
            return this.listMembers(request);
        });

        ipcMain.handle('get:external-members',  (_event: IpcMainInvokeEvent, request: ListMembersRequest) => {
            return this.listExternalMembers(request);
        });

        ipcMain.handle('create:member',  (_event: IpcMainInvokeEvent, member: Partial<Member>) => {
            return this.createMember(member);
        });

        ipcMain.handle('update:member',  (_event: IpcMainInvokeEvent, id: string, member: Partial<Member>) => {
            return this.updateMember(id, member);
        });

        ipcMain.handle('delete:member',  (_event: IpcMainInvokeEvent, id: string) => {
            return this.deleteMember(id);
        });

        ipcMain.handle('create:external-member',  (_event: IpcMainInvokeEvent, member: Partial<ExternalMembers>) => {
            return this.createExternalMember(member);
        });

        ipcMain.handle('update:external-member',  (_event: IpcMainInvokeEvent, id: string, member: Partial<ExternalMembers>) => {
            return this.updateExternalMember(id, member);
        });

        ipcMain.handle('delete:external-member',  (_event: IpcMainInvokeEvent, id: string) => {
            return this.deleteExternalMember(id);
        });

        ipcMain.handle('suspend:member',  (_event: IpcMainInvokeEvent, id: string, note: string) => {
            return this.suspendMember(id, note);
        });

        ipcMain.handle('unsuspend:member',  (_event: IpcMainInvokeEvent, id: string) => {
            return this.unsuspend(id);
        });

        ipcMain.handle('birthdays:member',  (_event: IpcMainInvokeEvent, month: number) => {
            return this.birthdays(month);
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