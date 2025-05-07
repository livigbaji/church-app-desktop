import { AttendanceStatus } from "electron/backend/types";

export interface UnitData {
  id: string;
  leader: string;
  name: string;
  description: string;
  deleted?: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface SignInRequest {
  user: string;
  isExternal: boolean;
  position?: string;
  timeIn: Date;
  status: AttendanceStatus;
}
