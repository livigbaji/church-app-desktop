import {ipcMain} from "electron";
import IpcMainInvokeEvent = Electron.IpcMainInvokeEvent;
import 'reflect-metadata';
import {plainToInstance} from "class-transformer";
import {validateOrReject, ValidationError} from "class-validator";
import EventEmitter  from 'node:events';
const validateMetadataKey = Symbol("Validate");

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();


export function OnSuccess(event: string) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const method = descriptor.value!;
        myEmitter.on(`success-${event}`, (...payload: any[]) => {
            return method.apply(target, payload)
        });
    }
}


/**
 * Annotation we can attach to service methods, so they can handle ipc events
 * This function returns a decorator
 * @param event invoke event name
 * @param useInvokeEvent pass the IPC event object
 * @constructor
 */
export function Handler(event: string, useInvokeEvent = false) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const method = descriptor.value!;
        const requiredParameters = Reflect.getOwnMetadata(validateMetadataKey, target, propertyKey);


        /**
         * - Register event,
         * - use the attached method as the handler,
         * - perform validations
         */
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
                .then((data: unknown) => {
                    myEmitter.emit(`success-${event}`, data);
                    return { success: true, data}
                })
                .catch((error: Error) => {
                    myEmitter.emit(`error-${event}`, error);
                    return { success: false, error}
                });
        });
    }
}

/**
 * Annotation to mark a function parameter to be validated during IPC invoke calls
 * @param constructor the parameter Class type
 * @constructor
 */
export function Validate<T>(constructor: T){
    return  (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
        let existingRequiredParameters: {index: number, constructor: T}[] = Reflect.getOwnMetadata(validateMetadataKey, target, propertyKey) || [];
        existingRequiredParameters.push({index: parameterIndex, constructor});
        Reflect.defineMetadata( validateMetadataKey, existingRequiredParameters, target, propertyKey);
    }
}


/**
 * formats `class-validator` error messages into a simpler presentable format
 * @param errors
 */
const formatError = (errors: ValidationError[]) => {
    type errorType = Record<string, string[]>;
    /**
     * Turns the array into an object using the `property` as key and `constraints` as value
     */
    return errors.reduce((acc: errorType, error: ValidationError) => ({
        ...acc,
        [error.property]: Object.values(error.constraints as Record<string, string>)
    }), {} as errorType);
}