import AbstractPropertyDescriptor, { AbstractPropertyDescriptorConstructor } from './AbstractPropertyDescriptor'
import PropertyCollector from './PropertyCollector'

export default class EntityPropertyDescriptors<T extends AbstractPropertyDescriptor> {

    name: string
    descriptors: Record<string, T> = {}
    orderedDescriptorKeys: string[] = []

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

        return this.addNewProperty( Type, target, propertyKey, propertyType )
    }

    addNewProperty( Type: AbstractPropertyDescriptorConstructor<T>, target: any, propertyKey: string, propertyType: any ): T {
        this.orderedDescriptorKeys.push(propertyKey)
        const descriptor = this.descriptors[propertyKey] = new Type( propertyKey, propertyType, PropertyCollector.objectName(target) )
        return descriptor
    }

    mergeDescriptors( itemToMerge: EntityPropertyDescriptors<T> ): void {
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

}