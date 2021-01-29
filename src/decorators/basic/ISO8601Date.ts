import BasicPropertyDescriptor from '../../lib/BasicPropertyDescriptor'
import EntityDescriptor, { PROPERTY_DECORATOR_FUNC } from '../../lib/EntityDescriptor'

const ERROR_MESSAGE = `The ISO8601Date decorator can only be applied to Date, String, or String[] properties.`

/**
 * Declare a string value to be an iso8601 date format. Can be leveraged by transformers to perform validations or other operations.
 */
export default function ISO8601Date(): PROPERTY_DECORATOR_FUNC {
    return EntityDescriptor.collectProperty<BasicPropertyDescriptor>(({ descriptor }) => {
        if( descriptor.propertyType !== Date && descriptor.propertyType !== String && descriptor.propertyType !== Array ) throw new Error(ERROR_MESSAGE)
        if( descriptor.propertyType === Array && descriptor.itemType !== String ) throw new Error(ERROR_MESSAGE)

        descriptor.stringFormat = 'iso8601date'
    })
}
