import BasicPropertyDescriptor from '../../lib/BasicPropertyDescriptor'
import EntityDescriptor, { PROPERTY_DECORATOR_FUNC } from '../../lib/EntityDescriptor'

/**
 * Declare a string value to be an phone format. Can be leveraged by transformers to perform validations or other operations.
 */
export default function Phone(): PROPERTY_DECORATOR_FUNC {
    return EntityDescriptor.collectProperty<BasicPropertyDescriptor>(({ descriptor }) => {
        if( descriptor.propertyType !== String && descriptor.propertyType !== Array ) throw new Error(`The Phone decorator can only be applied to string and string[] properties.`)
        descriptor.stringFormat = 'phone'
    })
}
