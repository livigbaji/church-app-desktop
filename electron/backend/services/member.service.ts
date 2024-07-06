import {Member} from "../models/member.model";
import {ExternalMembers} from "../models/external-member.model";
import {Handler, OnSuccess, Validate} from "../handler";
import {TestStuff, ExternalMemberLabel, ListMembersRequest, MemberStatus, CreateMemberRequest, CreateExternalMemberRequest} from "../types";
import knex from "knex";

export class MemberService {
    @Handler('doStuff')
    test(@Validate(TestStuff) args : TestStuff) {
        console.log(args);
        return ExternalMembers.query().insert({
            firstName: 'liv',
            lastName: 'liv but lastName',
            middleName: 'liv but middleName',
            unit: 'Hospitality',
            label: ExternalMemberLabel.WORKER,
            deleted: false
        })
    }

    @OnSuccess('doStuff')
    async runSomeOtherStuff(stuff: ExternalMembers) {
        console.log({ stuff });
        const f = await ExternalMembers.query().where({ id: stuff.id }).first();
        console.log({ f });
    }


    @Handler('get:members')
    listMembers(@Validate(ListMembersRequest) request: ListMembersRequest) {
        return  Member.query()
            .whereILike('firstName', `%${request.search}%`)
            .orWhereILike('middleName', `%${request.search}%`)
            .orWhereILike('lastName', `%${request.search}%`)
            .orderBy('firstName')
            .limit(request.limit || 500)
            .offset(request.offset || 0)

    }


    @Handler('get:external-members')
    listExternalMembers(@Validate(ListMembersRequest) request: ListMembersRequest) {
        return  ExternalMembers.query()
            .whereILike('firstName', `%${request.search}%`)
            .orWhereILike('middleName', `%${request.search}%`)
            .orWhereILike('lastName', `%${request.search}%`)
            .orderBy('firstName')
            .limit(request.limit || 500)
            .offset(request.offset || 0)
    }

    @Handler('create:member')
    createMember(@Validate(CreateMemberRequest) member: CreateMemberRequest) {
        return Member.query().insert({
            ...member,
            deleted: false,
        });
    }

    @Handler('update:member')
    updateMember(id: string, @Validate(CreateMemberRequest) member: CreateMemberRequest) {
        return Member.query().findById(id).patch({
            ...member,
            updatedAt: Member.knex().fn.now()
        })
    }

    @Handler('create:external-member')
    createExternalMember(@Validate(CreateExternalMemberRequest) member: Partial<ExternalMembers>) {
        return ExternalMembers.query().insert({
            ...member,
            deleted: false
        });
    }

    @Handler('update:external-member')
    updateExternalMember(id: string, @Validate(CreateExternalMemberRequest) member: Partial<ExternalMembers>) {
        return ExternalMembers.query().findById(id).patch({
            ...member,
            updatedAt: ExternalMembers.knex().fn.now()
        })
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
            suspendedAt: Member.knex().fn.now(),
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