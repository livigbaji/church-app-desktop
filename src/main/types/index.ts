/**
 * Indicator for someone in attendance if they are serving, present or absent
 */
export enum AttendanceStatus {
    PRESENT = 'PRESENT',
    ABSENT = 'ABSENT',
    SERVING = 'SERVING'
}

export enum MemberStatus {
    ACTIVE = 'ACTIVE',
    SUSPENDED = 'SUSPENDED',
    INACTIVE = 'INACTIVE'
}


/**
 * User type. Could be member or someone external to the unit
 */
export enum UserType {
    EXTERNAL = 'EXTERNAL',
    MEMBER = 'MEMBER'
}

export enum ExternalMemberLabel {
    DELEGATE = 'DELEGATE',
    PASTORATE = 'PASTORATE',
    WORKER = 'WORKER',
    VISITOR = 'VISITOR'
}

export enum MaritalStatus {
    SINGLE = 'SINGLE',
    MARRIED = 'MARRIED'
}

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

export type ListMembersRequest = {
    search: string,
    limit: number,
    offset: number,
    isExternal: boolean,
}

export type ListAttendanceRequest = {
    isExternal: boolean,
    date: Date,
    limit: number,
    offset: number,
}

export type signInRequest = {
    user: string,
    isExternal: boolean,
    position: string,
    timeIn: Date,
    status: AttendanceStatus
}

export type CreateUnit = {
    leader?: string;
    name: string;
    description: string;
}

export type CreateUnitPosition = {
    group: string;
    name: string;
    description: string;
}

export interface DBMigration {
    name: string,
    up: () => string,
    down: () => string,
}