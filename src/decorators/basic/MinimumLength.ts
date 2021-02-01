import BasicPropertyDescriptor from '../../lib/BasicPropertyDescriptor'
import EntityDescriptor from '../../lib/EntityDescriptor'
import { PropertyDecoratorFunc } from '../../types'

/**
 * Define the minimum length for Strings or Arrays
 */
export default function MinimumLength( minLength: number ): PropertyDecoratorFunc {
    return EntityDescriptor.collectProperty<BasicPropertyDescriptor>(({ descriptor }) => {
        if( descriptor.propertyType !== String && descriptor.propertyType !== Array ) throw new Error(`The MinimumLength decorator can only be applied to String or Array properties.`)
        descriptor.minLength = minLength
    })
}
