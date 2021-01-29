/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import AbstractPropertyDescriptor from './AbstractPropertyDescriptor'

const PROPERTY_COLLECTOR_METADATA_KEY = Symbol('PROPERTY_COLLECTOR_METADATA_KEY')

declare type PROPERTY_DECORATOR_FUNC = (target: any, propertyKey: string ) => void
declare type Class<T = any> = new (...args: any[]) => T;
declare type InstanceOfClass = InstanceType<Class>

export { PROPERTY_DECORATOR_FUNC, Class, InstanceOfClass }


export default abstract class AbstractEntityDescriptor<T extends AbstractPropertyDescriptor> {

    name: string
    descriptors: Record<string, T> = {}
    orderedDescriptorKeys: string[] = []
    PropertyDescriptorType: Class

    constructor( name: string, PropertyDescriptorType: Class ) {
        this.name = name
        this.PropertyDescriptorType = PropertyDescriptorType
    }

    static get PropertyDescriptorType(): Class {
        throw new Error(`Must be overridden by subclasses`)
    }

    static construct( _name: string, _PropertyDescriptorType: Class ): AbstractEntityDescriptor<any> {
        throw new Error(`Must be overridden by subclasses`)
    }

    addProperty( target: any, propertyKey: string ): T {
        const existingDescriptor = this.descriptors[propertyKey]
        if( existingDescriptor ) {
            // This happens when a property has more than 1 decorator - we want to
            // collect all the data in the same descriptor
            return existingDescriptor
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const propertyType = Reflect.getMetadata('design:type', target, propertyKey)

        return this.addNewProperty( target, propertyKey, propertyType )
    }

    addNewProperty( target: any, propertyKey: string, propertyType: any ): T {
        this.orderedDescriptorKeys.push(propertyKey)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const descriptor = this.descriptors[propertyKey] = new this.PropertyDescriptorType( propertyKey, propertyType, AbstractEntityDescriptor.objectName(target) )
        return descriptor as T
    }

    mergeDescriptors( itemToMerge: AbstractEntityDescriptor<T> ): void {
        this.descriptors = {...this.descriptors, ...itemToMerge.descriptors}
    }

    [Symbol.iterator]() {
        const length = this.orderedDescriptorKeys.length
        let index = 0
        return {
          next: () => {
                const key = this.orderedDescriptorKeys[index++]
                const descriptor = this.descriptors[key]
                return {
                    value: descriptor,
                    done: !(index <= length)
                }
            }
        }
    }

    static collectProperty<T extends AbstractPropertyDescriptor>( callback: ( info: { 
        descriptor: T,
        target: Class,
        propertyKey: string,
        descriptors: AbstractEntityDescriptor<T>}) => void ): PROPERTY_DECORATOR_FUNC {

        return (target: Class, propertyKey: string ): void => {
            const descriptors = this.getPropertyDescriptorsForObject<T>( target )
            const descriptor = descriptors.addProperty( target, propertyKey )

            callback({
                descriptor, 
                target, 
                propertyKey, 
                descriptors
            })

            Reflect.defineMetadata(PROPERTY_COLLECTOR_METADATA_KEY, descriptors, target.constructor)
        }
    }

    private static getPropertyDescriptorsForObject<T extends AbstractPropertyDescriptor>(target: Class): AbstractEntityDescriptor<T> {
        const name = this.objectName(target)

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const proto = Object.getPrototypeOf(target)
        const protoName = proto ? this.objectName(proto) : null

        // Get metadata for this object if it exists - create it if it doesn't
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        let descriptors = Reflect.getOwnMetadata(PROPERTY_COLLECTOR_METADATA_KEY, target.constructor) as AbstractEntityDescriptor<T>
        if( !descriptors ) descriptors = this.construct( name, this.PropertyDescriptorType ) as AbstractEntityDescriptor<T>

        // See if this object extends from another, if so get the parent metadata, and on, and on, and on, ...
        if (!!proto && !!protoName && protoName !== 'Object') {
            const superDescriptors = this.getPropertyDescriptorsForObject<T>(proto)
            if(superDescriptors) descriptors.mergeDescriptors( superDescriptors )
        }

        return descriptors
    }

    static objectName( target: { name: string, constructor: { name: string } } ): string {
        const name = target.name || target.constructor.name
        return name
    }

    static getDescriptorsFor<T extends AbstractPropertyDescriptor>( target: Class | InstanceOfClass ): AbstractEntityDescriptor<T> {
        const result = Reflect.getMetadata(PROPERTY_COLLECTOR_METADATA_KEY, target) as AbstractEntityDescriptor<T>
        if( result ) return result

        // This gets hit when the target is not decorated
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return this.construct( this.objectName(target), this.PropertyDescriptorType ) as AbstractEntityDescriptor<T>
    }

}
