import {ipcMain} from "electron";
import IpcMainInvokeEvent = Electron.IpcMainInvokeEvent;
import 'reflect-metadata';
import {plainToInstance} from "class-transformer";
import {validateOrReject, ValidationError} from "class-validator";
const validateMetadataKey = Symbol("Validate");


export function Handler(event: string, useInvokeEvent = false) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        let method = descriptor.value!;
        let requiredParameters = Reflect.getOwnMetadata(validateMetadataKey, target, propertyKey);

        ipcMain.handle(event,  async (_event: IpcMainInvokeEvent, ...args) => {
            if(requiredParameters && requiredParameters.length) {
                for (const { index, constructor } of requiredParameters) {
                    try {
                        await validateOrReject(plainToInstance(constructor, args[index] || {}));
                    } catch (e: unknown) {
                        return  { success: false, error: formatError(e as ValidationError[]) }
                    }
                }
            }
            const extraArgs = useInvokeEvent ? [_event] : [];
            return method.apply(target, extraArgs.concat(args))
                .then((data: unknown) => ({ success: true, data}))
                .catch((error: Error) => ({ success: false, error}));
        });
    }
}


export function Validate<T>(constructor: T){
    return  (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
        let existingRequiredParameters: {index: number, constructor: T}[] = Reflect.getOwnMetadata(validateMetadataKey, target, propertyKey) || [];
        existingRequiredParameters.push({index: parameterIndex, constructor});
        Reflect.defineMetadata( validateMetadataKey, existingRequiredParameters, target, propertyKey);
    }
}


const formatError = (errors: ValidationError[]) => {
    type errorType = Record<string, string[]>;
    return errors.reduce((acc: errorType, error: ValidationError) => ({
        ...acc,
        [error.property]: Object.values(error.constraints as Record<string, string>)
    }), {} as errorType);
}