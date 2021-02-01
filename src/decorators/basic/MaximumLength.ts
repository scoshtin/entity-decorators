import BasicPropertyDescriptor from '../../lib/BasicPropertyDescriptor'
import EntityDescriptor from '../../lib/EntityDescriptor'
import { PropertyDecoratorFunc } from '../../types'

/**
 * Define the maximum length for Strings or Arrays
 * 
 * @param - maxLength - the maximum length of the string value
 */
export default function MaximumLength( maxLength: number ): PropertyDecoratorFunc {
    return EntityDescriptor.collectProperty<BasicPropertyDescriptor>(({ descriptor }) => {
        if( descriptor.propertyType !== String && descriptor.propertyType !== Array ) throw new Error(`The MaximumLength decorator can only be applied to String or Array properties.`)
        descriptor.maxLength = maxLength
    })
}
