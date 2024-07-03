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