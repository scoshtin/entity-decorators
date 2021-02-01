import BasicPropertyDescriptor from '../../lib/BasicPropertyDescriptor'
import EntityDescriptor from '../../lib/EntityDescriptor'
import { PropertyDecoratorFunc } from '../../types'

/**
 * Define the minimum value for a number property
 * 
 * @param minimumValue - The minimum value to allow
 */
export default function MinimumValue( minimumValue: number ): PropertyDecoratorFunc {
    return EntityDescriptor.collectProperty<BasicPropertyDescriptor>(({ descriptor }) => {
        if( descriptor.propertyType !== Number ) throw new Error(`The MinimumValue decorator can only be applied to number properties.`)
        descriptor.minimumValue = minimumValue
    })
}
