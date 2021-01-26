import BasicPropertyDescriptor from '../../lib/BasicPropertyDescriptor'
import PropertyCollector, { PROPERTY_DECORATOR_FUNC } from '../../lib/PropertyCollector'

/**
 * Define the maximum length for Strings or Arrays
 */
export default function MaxLength( maxLength: number ): PROPERTY_DECORATOR_FUNC {
    return PropertyCollector.collectProperty( BasicPropertyDescriptor, (descriptor: BasicPropertyDescriptor) => {
        if( descriptor.propertyType !== String && descriptor.propertyType !== Array ) throw new Error(`The MaxLength decorator can only be applied to String or Array properties.`)
        descriptor.maxLength = maxLength
    })
}
