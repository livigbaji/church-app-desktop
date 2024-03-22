import {ipcMain} from "@electron/remote";
import {Unit, UnitPosition} from "../models/unit.model.ts";
import {CreateUnit, CreateUnitPosition} from "../types";
import IpcMainInvokeEvent = Electron.IpcMainInvokeEvent;

export class UnitService {
    constructor() {
        this.init()
    }

    init() {
        ipcMain.handle('get:units',  () => {
            return this.listUnits();
        });

        ipcMain.handle('get:unitPositions',  (_event: IpcMainInvokeEvent, unit: string) => {
            return this.listUnitPosition(unit);
        });

        ipcMain.handle('create:unit',  (_event: IpcMainInvokeEvent, request: CreateUnit) => {
            return this.createUnit(request);
        });

        ipcMain.handle('create:unitPosition',  (_event: IpcMainInvokeEvent, request: CreateUnitPosition) => {
            return this.createUnitPosition(request);
        });

        ipcMain.handle('update:unit',  (_event: IpcMainInvokeEvent, id: string, request: CreateUnit) => {
            return this.updateUnit(id, request);
        });

        ipcMain.handle('update:unitPosition',  (_event: IpcMainInvokeEvent, id: string, request: CreateUnitPosition) => {
            return this.updateUnitPosition(id, request);
        });

        ipcMain.handle('delete:unit',  (_event: IpcMainInvokeEvent, id: string) => {
            return this.deleteUnit(id);
        });

        ipcMain.handle('delete:unit',  (_event: IpcMainInvokeEvent, id: string) => {
            return this.deleteUnitPosition(id);
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

    async deleteUnit(id: string) {
        await UnitPosition.query().where({ unit: id }).delete();
        return Unit.query().deleteById(id);
    }

    deleteUnitPosition(id: string) {
        return UnitPosition.query().deleteById(id)
    }
}