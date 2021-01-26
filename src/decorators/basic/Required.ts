import BasicPropertyDescriptor from '../../lib/BasicPropertyDescriptor'
import PropertyCollector, { PROPERTY_DECORATOR_FUNC } from '../../lib/PropertyCollector'

/**
 * This property is required
 */
export default function Required(): PROPERTY_DECORATOR_FUNC {
    return PropertyCollector.collectProperty( BasicPropertyDescriptor, (descriptor: BasicPropertyDescriptor) => {
        descriptor.required = true
    })
}
