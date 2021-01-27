import BasicPropertyDescriptor from '../../lib/BasicPropertyDescriptor'
import EntityDescriptor, { PROPERTY_DECORATOR_FUNC } from '../../lib/EntityDescriptor'

/**
 * Declare a string value to be an iso8601 date format. Can be leveraged by transformers to perform validations or other operations.
 */
export default function ISO8601Date(): PROPERTY_DECORATOR_FUNC {
    return EntityDescriptor.collectProperty<BasicPropertyDescriptor>(({ descriptor }) => {
        if( descriptor.propertyType !== Date && descriptor.propertyType !== String ) throw new Error(`The ISO8601Date decorator can only be applied to Date or String properties.`)
        descriptor.stringFormat = 'iso8601date'
    })
}
