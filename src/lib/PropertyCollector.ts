/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import AbstractPropertyDescriptor, { AbstractPropertyDescriptorConstructor } from './AbstractPropertyDescriptor'
import AbstractEntityDescriptor from './AbstractEntityDescriptor'
import 'reflect-metadata'

/*
const PROPERTY_COLLECTOR_METADATA_KEY = Symbol('PROPERTY_COLLECTOR_METADATA_KEY')

declare type CollectedPropertyInfo<T extends AbstractPropertyDescriptor> = {
    descriptor: T,
    target: any,
    propertyKey: string,
    descriptors: AbstractEntityDescriptor<T>
}

declare type PROPERTY_DECORATOR_FUNC = (target: any, propertyKey: string ) => void
declare type Class<T = any> = new (...args: any[]) => T;
declare type InstanceOfClass = InstanceType<Class>

export {
    PROPERTY_DECORATOR_FUNC,
    Class,
    InstanceOfClass,
    CollectedPropertyInfo
}

export default class PropertyCollector {

    static collectProperty<T extends AbstractPropertyDescriptor>( Type: AbstractPropertyDescriptorConstructor<T>, callback: (info: CollectedPropertyInfo<T>) => void ): PROPERTY_DECORATOR_FUNC {
        return (target: any, propertyKey: string ): void => {
            // console.log(`Collecting property: ${this.objectName(target)}.${propertyKey}`)

            const descriptors = this.getPropertyDescriptorsForObject<T>( Type, target)
            // const descriptor = new Type( propertyKey, this.objectName(target))
            const descriptor = descriptors.addProperty( Type, target, propertyKey )

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

        const proto = Object.getPrototypeOf(target)
        const protoName = proto ? this.objectName(proto) : null

        // Get metadata for this object if it exists - create it if it doesn't
        let descriptors = Reflect.getOwnMetadata(PROPERTY_COLLECTOR_METADATA_KEY, target.constructor) as AbstractEntityDescriptor<T>
        if( !descriptors ) descriptors = new AbstractEntityDescriptor<T>(name)

        // See if this object extends from another, if so get the parent metadata, and on, and on, and on, ...
        if (!!proto && !!protoName && protoName !== 'Object') {
            const superDescriptors = this.getPropertyDescriptorsForObject<T>(proto)
            if(superDescriptors) descriptors.mergeDescriptors( superDescriptors )
        }

        return descriptors
    }

    static objectName( target: any ): string {
        const name = target.name || target.constructor.name
        return name as string
    }

    private static getDescriptorsFor<T extends AbstractPropertyDescriptor>( target: Class | InstanceOfClass ): AbstractEntityDescriptor<T> {
        const result = Reflect.getMetadata(PROPERTY_COLLECTOR_METADATA_KEY, target) as AbstractEntityDescriptor<T>
        if( result ) return result

        // This gets hit when the target is not decorated
        return new AbstractEntityDescriptor<T>( target.name )
    }

    static getDescriptorsForClass<T extends AbstractPropertyDescriptor>( target: Class ): AbstractEntityDescriptor<T> {
        return this.getDescriptorsFor( target )
    }

    static getDescriptorsForInstance<T extends AbstractPropertyDescriptor>( target: InstanceOfClass ): AbstractEntityDescriptor<T> {
        return this.getDescriptorsFor( target.constructor )
    }

}
*/