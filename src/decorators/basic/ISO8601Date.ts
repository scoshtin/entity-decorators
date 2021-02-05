import BasicPropertyDescriptor from '../../lib/BasicPropertyDescriptor'
import EntityDescriptor from '../../lib/EntityDescriptor'

const ERROR_MESSAGE = `The ISO8601Date decorator can only be applied to Date, String, or String[] properties.`

/**
 * Declare a string value to be an iso8601 date format. Can be leveraged by transformers to perform validations or other operations.
 */
const ISO8601Date = EntityDescriptor.collectProperty<BasicPropertyDescriptor>(({ descriptor }) => {
    if( descriptor.propertyType !== Date && descriptor.propertyType !== String && descriptor.propertyType !== Array ) throw new Error(ERROR_MESSAGE)
    if( descriptor.propertyType === Array && descriptor.itemType !== String ) throw new Error(ERROR_MESSAGE)

    descriptor.stringFormat = 'iso8601date'
})
export default ISO8601Date
