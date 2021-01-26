import BasicPropertyDescriptor from '../../lib/BasicPropertyDescriptor'
import EntityDescriptor, { PROPERTY_DECORATOR_FUNC } from '../../lib/EntityDescriptor'

/**
 * Define the maxium value for a number property
 * 
 * @param maximumValue - The maxium value to allow
 */
export default function MaximumValue( maximumValue: number ): PROPERTY_DECORATOR_FUNC {
    return EntityDescriptor.collectProperty<BasicPropertyDescriptor>(({ descriptor }) => {
        if( descriptor.propertyType !== Number ) throw new Error(`The MaximumValue decorator can only be applied to number properties.`)
        descriptor.maximumValue = maximumValue
    })
}
