import BasicPropertyDescriptor from '../../lib/BasicPropertyDescriptor'
import EntityDescriptor, { PROPERTY_DECORATOR_FUNC } from '../../lib/EntityDescriptor'

/**
 * Supply a list of allowed values for string or number properties.
 * 
 * @param enumerationValues - An Array or variable arguments for the allow values
 */
export default function Enumeration(...enumerationValues: (string | number | string[])[]): PROPERTY_DECORATOR_FUNC {
    return EntityDescriptor.collectProperty<BasicPropertyDescriptor>(({ descriptor }) => {
        if( descriptor.propertyType !== String && descriptor.propertyType !== Number ) throw new Error(`The Enumeration decorator can only be applied to String or Number properties.`)
        if( enumerationValues.length > 0 && Array.isArray(enumerationValues[0]) ){
            if( enumerationValues.length > 1 ) throw new Error(`When you provide an array of values instead of var args you are only allowed to pass 1 argument.`)
            enumerationValues = enumerationValues[0]
        }
        if( !enumerationValues.length ) throw new Error(`The Enumeration decorator requires one or more allowed values.`)

        // TODO: validate the allowed value types

        descriptor.enumerationValues = enumerationValues as (string | number)[]
    })
}
