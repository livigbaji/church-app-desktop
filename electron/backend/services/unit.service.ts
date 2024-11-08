import { Unit, UnitPosition } from "../models/unit.model";
import { CreateUnit, CreateUnitPosition } from "../types";
import { Handler, Validate } from "../handler";
import { request } from "@playwright/test";

export class UnitService {
  @Handler("get:units")
  listUnits() {
    return Unit.query();
  }

  @Handler("get:unitPositions")
  listUnitPosition(unit: string) {
    return UnitPosition.query().where({
      unit,
    });
  }

  @Handler("create:unit")
  createUnit(@Validate(CreateUnit) request: CreateUnit) {
    return Unit.query().insert({
      ...(request.leader && { leader: request.leader }),
      name: request.name,
      description: request.description,
    });
  }

  @Handler("create:unitPosition")
  createUnitPosition(
    @Validate(CreateUnitPosition) request: CreateUnitPosition
  ) {
    return UnitPosition.query().insert({
      group: request.group,
      name: request.name,
      description: request.description,
    });
  }

  @Handler("update:unit")
  updateUnit(id: string, @Validate(CreateUnit) request: CreateUnit) {
    return Unit.query()
      .patch({
        ...(request.leader && { leader: request.leader }),
        name: request.name,
        description: request.description,
      })
      .where({ id });
  }

  @Handler("update:unitPosition")
  updateUnitPosition(
    id: string,
    @Validate(CreateUnitPosition) request: CreateUnitPosition
  ) {
    return UnitPosition.query()
      .patch({
        group: request.group,
        name: request.name,
        description: request.description,
      })
      .where({ id });
  }

  @Handler("delete:unit")
  async deleteUnit(id: string) {
    await UnitPosition.query().where({ unit: id }).delete();
    return Unit.query().deleteById(id);
  }

  @Handler("delete:unitPosition")
  deleteUnitPosition(id: string) {
    return UnitPosition.query().deleteById(id);
  }
}
