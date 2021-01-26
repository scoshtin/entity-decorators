import BasicPropertyDescriptor from './BasicPropertyDescriptor'
import AbstractPropertyDescriptor, { AbstractPropertyDescriptorConstructor } from './AbstractPropertyDescriptor'
//import PropertyCollector, { Class, CollectedPropertyInfo, InstanceOfClass } from './PropertyCollector'

const PROPERTY_COLLECTOR_METADATA_KEY = Symbol('PROPERTY_COLLECTOR_METADATA_KEY')

declare type PROPERTY_DECORATOR_FUNC = (target: any, propertyKey: string ) => void
declare type Class<T = any> = new (...args: any[]) => T;
declare type InstanceOfClass = InstanceType<Class>

declare type CollectedPropertyInfo<T extends AbstractPropertyDescriptor> = {
    descriptor: T,
    target: Class,
    propertyKey: string,
    descriptors: AbstractEntityDescriptor<T>
}

export { PROPERTY_DECORATOR_FUNC, Class, InstanceOfClass }


// <B extends BottomLevelInterface<T>, 
//     T = B extends BottomLevelInterface<infer _T> ? _T : never> {
//   _dummy_B?: B;

//export default abstract class AbstractEntityDescriptor<E extends AbstractEntityDescriptor<E, T>, T extends AbstractPropertyDescriptor> {

export default abstract class AbstractEntityDescriptor<T extends AbstractPropertyDescriptor> {
    name: string
    descriptors: Record<string, T> = {}
    orderedDescriptorKeys: string[] = []
    PropertyDescriptorType: Class

    constructor( name: string, PropertyDescriptorType: Class ) {
        this.name = name
        this.PropertyDescriptorType = PropertyDescriptorType
    }

    static get PropertyDescriptorType(){
        return BasicPropertyDescriptor
    }

    static construct<T extends AbstractPropertyDescriptor>( _name: string, _PropertyDescriptorType: Class ): ThisType<AbstractEntityDescriptor<T>> {
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
        const descriptor = this.descriptors[propertyKey] = new this.PropertyDescriptorType( propertyKey, propertyType, AbstractEntityDescriptor.objectName(target) )
        return descriptor
    }

    mergeDescriptors( itemToMerge: AbstractEntityDescriptor<T> ): void {
        this.descriptors = {...this.descriptors, ...itemToMerge.descriptors}
    }

    [Symbol.iterator]() {
        let length = this.orderedDescriptorKeys.length
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

        return (target: any, propertyKey: string ): void => {
            // console.log(`Collecting property: ${this.objectName(target)}.${propertyKey}`)

            const descriptors = this.getPropertyDescriptorsForObject<T>( target )
            // const descriptor = new Type( propertyKey, this.objectName(target))
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

        const proto = Object.getPrototypeOf(target)
        const protoName = proto ? this.objectName(proto) : null

        // Get metadata for this object if it exists - create it if it doesn't
        let descriptors = Reflect.getOwnMetadata(PROPERTY_COLLECTOR_METADATA_KEY, target.constructor)
        if( !descriptors ) descriptors = this.construct<T>( name, this.PropertyDescriptorType )

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

    private static getDescriptorsFor( target: Class | InstanceOfClass ): any {
        const result = Reflect.getMetadata(PROPERTY_COLLECTOR_METADATA_KEY, target)
        if( result ) return result

        // This gets hit when the target is not decorated
        // return new (this)( target.name )
        return this.construct( target.name, this.PropertyDescriptorType )
    }

    static getDescriptorsForClass( target: Class ): any {
        return this.getDescriptorsFor( target )
    }

    static getDescriptorsForInstance( target: InstanceOfClass ): any {
        return this.getDescriptorsFor( target.constructor )
    }

}
