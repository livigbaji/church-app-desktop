import {Member} from "../models/member.model";
import {Admin} from "../models/admin.model";
import { createHash } from 'crypto';
import {Handler, Validate} from "../handler";
import {ChangePinRequest, LoginRequest} from "../types";

export class AdminService {
    private hash(inputString: string) {
        return createHash('md5').update(inputString).digest("hex")
    }

    @Handler('login')
    async login(@Validate(LoginRequest) request: LoginRequest) {
        const { phone, pin } = request;
        const member = await Member.query().where({
            phoneNumber: phone
        }).first();

        if(!member) {
            return Promise.reject('incorrect phone number');
        }

        const admin = await Admin.query().where({
            user: member.id
        }).first();

        if(!admin) {
            return Promise.reject('incorrect phone number');
        }

        if(this.hash(pin) != admin.pin) {
            return Promise.reject('incorrect pin');
        }

        return member;
    }

    @Handler('makeAdmin')
    async makeAdmin(user: string) {
        const member = await Member.query().where({
            id: user
        }).first();

        if(!member) {
            return Promise.reject('member does not exist');
        }

        const admin = await Admin.query().where({
            user: member.id
        }).first();

        if(admin) {
            return Promise.reject('user is already an admin');
        }

        return Admin.query().insert({
            user,
            pin: this.hash('0000'),
        })
    }


    @Handler('changePin')
    async changePin(@Validate(ChangePinRequest) request: ChangePinRequest) {
        const { user, oldPin, newPin } = request;
        const member = await Member.query().where({
            id: user
        }).first();

        if(!member) {
            return Promise.reject('member does not exist');
        }

        const admin = await Admin.query().where({
            user: member.id
        }).first();

        if(!admin) {
            return Promise.reject('admin profile does not exist');
        }

        if(this.hash(oldPin) != admin.pin) {
            return Promise.reject('incorrect pin');
        }

        await Admin.query().where({
            user: member.id
        }).patch({
            pin: this.hash(newPin)
        })


        return true;
    }


    @Handler('suspendAdmin')
    suspendAdmin(user: string) {
        return Admin.query().where({
            user,
        }).delete()
    }

    @Handler('listAdmins')
    listAdmins() {
        return Admin.query();
    }


}