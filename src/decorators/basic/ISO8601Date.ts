import BasicPropertyDescriptor from '../../lib/BasicPropertyDescriptor'
import PropertyCollector, { PROPERTY_DECORATOR_FUNC } from '../../lib/PropertyCollector'

/**
 * Marks a string property containing an ISO8601 formatted date
 */
export default function ISO8601Date(): PROPERTY_DECORATOR_FUNC {
    return PropertyCollector.collectProperty( BasicPropertyDescriptor, (descriptor: BasicPropertyDescriptor) => {
        if( descriptor.propertyType !== Date && descriptor.propertyType !== String ) throw new Error(`The ISO8601Date decorator can only be applied to Date or String properties.`)
        descriptor.isISO8601Date = true
    })
}
