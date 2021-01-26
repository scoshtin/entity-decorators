import BasicPropertyDescriptor from '../../lib/BasicPropertyDescriptor'
import PropertyCollector, { PROPERTY_DECORATOR_FUNC } from '../../lib/PropertyCollector'

/**
 * Declare a value to be an email format
 */
export default function Email(): PROPERTY_DECORATOR_FUNC {
    return PropertyCollector.collectProperty( BasicPropertyDescriptor, (descriptor: BasicPropertyDescriptor) => {
        if( descriptor.propertyType !== String && descriptor.propertyType !== Array ) throw new Error(`The Email decorator can only be applied to string and string[] properties.`)
        descriptor.knownFormat = 'email'
    })
}
