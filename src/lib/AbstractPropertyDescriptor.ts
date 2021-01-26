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
        this.propertyTypeName = this.objectName( propertyType )
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

    objectName( target: any ): string {
        const name = target.name || target.constructor.name
        return name as string
    }

}
