import BasicPropertyDescriptor from '../../lib/BasicPropertyDescriptor'
import EntityDescriptor from '../../lib/EntityDescriptor'
import { PropertyDecoratorFunc } from '../../types'

/**
 * Declare a string value to be an url format. Can be leveraged by transformers to perform validations or other operations.
 */
export default function Url(): PropertyDecoratorFunc {
    return EntityDescriptor.collectProperty<BasicPropertyDescriptor>(({ descriptor }) => {
        if( descriptor.propertyType !== String && descriptor.propertyType !== Array ) throw new Error(`The Url decorator can only be applied to string and string[] properties.`)
        descriptor.stringFormat = 'url'
    })
}
