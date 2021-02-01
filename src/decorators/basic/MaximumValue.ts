import BasicPropertyDescriptor from '../../lib/BasicPropertyDescriptor'
import EntityDescriptor from '../../lib/EntityDescriptor'
import { PropertyDecoratorFunc } from '../../types'

/**
 * Define the maxium value for a number property
 * 
 * @param maximumValue - The maxium value to allow
 */
export default function MaximumValue( maximumValue: number ): PropertyDecoratorFunc {
    return EntityDescriptor.collectProperty<BasicPropertyDescriptor>(({ descriptor }) => {
        if( descriptor.propertyType !== Number ) throw new Error(`The MaximumValue decorator can only be applied to number properties.`)
        descriptor.maximumValue = maximumValue
    })
}
