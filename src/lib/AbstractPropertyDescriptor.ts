/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import PropertyCollector from './PropertyCollector'


type AbstractPropertyDescriptorConstructor<T extends AbstractPropertyDescriptor> = new (propertyKey: string, propertyType: any, definedIn: string) => T
export { AbstractPropertyDescriptorConstructor }

export default abstract class AbstractPropertyDescriptor {

    propertyKey: string
    propertyType: any
    propertyTypeName: string
    definedIn: string

    // For child objects and array elements
    itemType: any

    constructor( propertyKey: string, propertyType: any, definedIn: string ) {
        this.propertyKey = propertyKey
        this.propertyType = propertyType
        this.propertyTypeName = PropertyCollector.objectName( propertyType )
        this.definedIn = definedIn
    }

    get isPrimitive() {
        return [String, Date, Number, Boolean].indexOf( this.propertyType ) !== -1
    }

    /**
     * This is a custom type - like a class
     */
    get isCustomType() {
        if( this.propertyType === Array ) return false
        return !this.isPrimitive
    }

}
