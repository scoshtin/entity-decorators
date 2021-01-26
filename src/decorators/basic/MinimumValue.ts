import BasicPropertyDescriptor from '../../lib/BasicPropertyDescriptor'
import PropertyCollector, { PROPERTY_DECORATOR_FUNC } from '../../lib/PropertyCollector'

/**
 * Define the minimum value for a number property
 * 
 * @param minimumValue - The minimum value to allow
 */
export default function MinimumValue( minimumValue: number ): PROPERTY_DECORATOR_FUNC {
    return PropertyCollector.collectProperty( BasicPropertyDescriptor, (descriptor: BasicPropertyDescriptor) => {
        if( descriptor.propertyType !== Number ) throw new Error(`The MinimumValue decorator can only be applied to number properties.`)
        descriptor.minimumValue = minimumValue
    })
}
