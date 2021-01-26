import AbstractPropertyDescriptor, { AbstractPropertyDescriptorConstructor } from './AbstractPropertyDescriptor'
import PropertyCollector from './PropertyCollector'

export default class PropertyDescriptors<T extends AbstractPropertyDescriptor> {

    name: string
    descriptors: Record<string, T> = {}

    constructor( name: string ) {
        this.name = name
    }

    addProperty( Type: AbstractPropertyDescriptorConstructor<T>, target: any, propertyKey: string ): T {
        const existingDescriptor = this.descriptors[propertyKey]
        if( existingDescriptor ) {
            // This happens when a property has more than 1 decorator - we want to
            // collect all the data in the same descriptor
            return existingDescriptor
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const propertyType = Reflect.getMetadata('design:type', target, propertyKey)

        this.descriptors[propertyKey] = new Type( propertyKey, propertyType, PropertyCollector.objectName(target) )
        return this.descriptors[propertyKey]
    }

    mergeDescriptors( itemToMerge: PropertyDescriptors<T> ): void {
        this.descriptors = {...this.descriptors, ...itemToMerge.descriptors}
    }

}