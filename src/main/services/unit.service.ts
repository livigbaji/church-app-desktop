import {ipcMain} from "@electron/remote";
import {Unit, UnitPosition} from "../models/unit.model.ts";
import {CreateUnit, CreateUnitPosition} from "../types";

export class UnitService {
    constructor() {
        this.init()
    }

    init() {
        ipcMain.handle('get:units',  () => {
            return [] // this.listMembers();
        });
    }

    listUnits() {
        return Unit.query()
    }

    listUnitPosition(unit: string) {
        return UnitPosition.query().where({
            unit,
        })
    }

    createUnit(request: CreateUnit) {
        return Unit.query().insert({
            ...(request.leader && { leader: request.leader }),
            name: request.name,
            description: request.description
        });
    }

    createUnitPosition(request: CreateUnitPosition) {
        return UnitPosition.query().insert({
            group: request.group,
            name: request.name,
            description: request.description
        })
    }

    updateUnit(id: string, request: CreateUnit) {
        return Unit.query().patch({
            ...(request.leader && { leader: request.leader }),
            name: request.name,
            description: request.description
        }).where({ id, });
    }

    updateUnitPosition(id: string, request: CreateUnitPosition) {
        return UnitPosition.query().patch({
            group: request.group,
            name: request.name,
            description: request.description
        }).where({ id, })
    }

    deleteUnit(id: string) {
        return Unit.query().deleteById(id);
    }

    deleteUnitPosition(id: string) {
        return UnitPosition.query().deleteById(id)
    }
}