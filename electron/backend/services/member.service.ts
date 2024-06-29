import {Member} from "../models/member.model";
import {ExternalMembers} from "../models/external-member.model";
import {ExternalMemberLabel, ListMembersRequest, MemberStatus} from "../types";
import {Handler} from "../handler";

export class MemberService {
    @Handler('doStuff')
    test(name: string, password: string) {
        return ExternalMembers.query().insert({
            firstName: 'liv',
            lastName: 'liv but lastName',
            middleName: 'liv but middleName',
            unit: 'Hospitality',
            label: ExternalMemberLabel.WORKER
        })
    }


    @Handler('get:members')
    listMembers(request: ListMembersRequest) {
        return  Member.query()
            .whereILike('firstName', `%${request.search}%`)
            .orWhereILike('middleName', `%${request.search}%`)
            .orWhereILike('lastName', `%${request.search}%`)
            .orderBy('firstName')
            .limit(request.limit || 500)
            .offset(request.offset || 0)

    }


    @Handler('get:external-members')
    listExternalMembers(request: ListMembersRequest) {
        return  ExternalMembers.query()
            .whereILike('firstName', `%${request.search}%`)
            .orWhereILike('middleName', `%${request.search}%`)
            .orWhereILike('lastName', `%${request.search}%`)
            .orderBy('firstName')
            .limit(request.limit || 500)
            .offset(request.offset || 0)
    }

    @Handler('create:member')
    createMember(member: Partial<Member>) {
        return Member.query().insert(member);
    }

    @Handler('update:member')
    updateMember(id: string, member: Partial<Member>) {
        return Member.query().findById(id).patch(member)
    }

    @Handler('create:external-member')
    createExternalMember(member: Partial<ExternalMembers>) {
        return ExternalMembers.query().insert(member);
    }

    @Handler('update:external-member')
    updateExternalMember(id: string, member: Partial<ExternalMembers>) {
        return ExternalMembers.query().findById(id).patch(member)
    }

    @Handler('delete:member')
    deleteMember(id: string) {
        return Member.query().deleteById( id );
    }

    @Handler('delete:external-member')
    deleteExternalMember(id: string) {
        return ExternalMembers.query().deleteById( id );
    }

    @Handler('suspend:member')
    suspendMember(id: string, note: string) {
        return Member.query().findById(id).patchAndFetch({
            status: MemberStatus.SUSPENDED,
            suspensionDescription: note,
            suspendedAt: new Date(),
        })
    }


    @Handler('unsuspend:member')
    unsuspend(id: string) {
        return Member.query().findById(id).patchAndFetch({
            status:  MemberStatus.ACTIVE,
            suspendedAt: null,
        });
    }

    @Handler('birthdays:member')
    birthdays(month: number) {
        return Member.query().where({
            birthMonth: month,
            status:  MemberStatus.ACTIVE,
        })
            .orderBy('birthDate');
    }
}