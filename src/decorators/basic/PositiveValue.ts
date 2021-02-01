import BasicPropertyDescriptor from '../../lib/BasicPropertyDescriptor'
import EntityDescriptor from '../../lib/EntityDescriptor'
import { PropertyDecoratorFunc } from '../../types'

/**
 * Property should always be a negative number
 */
export default function PositiveValue(): PropertyDecoratorFunc {
    return EntityDescriptor.collectProperty<BasicPropertyDescriptor>(({ descriptor }) => {
        if( descriptor.propertyType !== Number ) throw new Error(`The PositiveValue decorator can only be applied to number properties.`)
        descriptor.positiveValue = true
    })
}
