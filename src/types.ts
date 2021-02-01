/* eslint-disable @typescript-eslint/no-explicit-any */

export declare type PropertyTypes = 'String' | 'Number' | 'Boolean' | 'Date' | 'Array' | 'Custom'

export declare type DecoratorHandlerFunc = () => void

export declare type EntityTransformerOptions = {
    customHandlers: Record<keyof PropertyTypes, DecoratorHandlerFunc[]>
}

export declare type PropertyDecoratorFunc = (target: any, propertyKey: string ) => void

export declare type Class<T = any> = new (...args: any[]) => T;

export declare type InstanceOfClass = InstanceType<Class>

export declare type StringFormats = 'email' | 'phone' | 'url' | 'iso8601date'
