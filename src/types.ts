/* eslint-disable @typescript-eslint/no-explicit-any */

import BasicPropertyDescriptor from "./lib/BasicPropertyDescriptor";

// export declare type PropertyTypes = 'String' | 'Number' | 'Boolean' | 'Date' | 'Array' | 'Custom'

export declare type DecoratorHandlerFunc<T> = ( collector: T, descriptor: BasicPropertyDescriptor ) => T

export declare type EntityTransformerOptions<T> = {
    customHandlers?: Record<string, DecoratorHandlerFunc<T>[]>
}

export declare type PropertyDecoratorFunc = (target: any, propertyKey: string ) => void

export declare type Class<T = any> = new (...args: any[]) => T;

export declare type InstanceOfClass = InstanceType<Class>

export declare type StringFormats = 'email' | 'phone' | 'url' | 'iso8601date'
