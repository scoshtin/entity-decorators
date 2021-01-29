/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.propertyType = propertyType
        this.propertyTypeName = this.objectName( propertyType )
        this.definedIn = definedIn
    }

    get isPrimitive(): boolean {
        return [String, Date, Number, Boolean].indexOf( this.propertyType ) !== -1
    }

    get isArrayWithCustomType(): boolean {
        return this.propertyType === Array && !!this.itemType
    }

    /**
     * This is a custom type - like a class
     */
    get isCustomType(): boolean {
        if( this.propertyType === Array ) return false
        return !this.isPrimitive
    }

    objectName( target: { name: string, constructor: { name: string } } ): string {
        const name = target.name || target.constructor.name
        return name
    }

}
