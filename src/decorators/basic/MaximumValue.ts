import BasicPropertyDescriptor from '../../lib/BasicPropertyDescriptor'
import PropertyCollector, { PROPERTY_DECORATOR_FUNC } from '../../lib/PropertyCollector'

/**
 * Define the maxium value for a number property
 * 
 * @param maximumValue - The maxium value to allow
 */
export default function MaximumValue( maximumValue: number ): PROPERTY_DECORATOR_FUNC {
    return PropertyCollector.collectProperty( BasicPropertyDescriptor, (descriptor: BasicPropertyDescriptor) => {
        if( descriptor.propertyType !== Number ) throw new Error(`The MaximumValue decorator can only be applied to number properties.`)
        descriptor.maximumValue = maximumValue
    })
}
