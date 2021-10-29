import BasicPropertyDescriptor from '../../lib/BasicPropertyDescriptor'
import EntityDescriptor from '../../lib/EntityDescriptor'
import { PropertyDecoratorFunc } from '../../types'

/**
 * Supply a list of allowed values for string or number properties.
 * 
 * @param enumerationValues - An Array or variable arguments for the allow values
 */
export default function Enumeration(...enumerationValues: (string | number | string[])[]): PropertyDecoratorFunc {
    return EntityDescriptor.collectProperty<BasicPropertyDescriptor>(({ descriptor }) => {
        if( descriptor.propertyType !== String && descriptor.propertyType !== Number && descriptor.propertyType !== Array ) throw new Error(`The Enumeration decorator can only be applied to String or Number properties.`)
        if( enumerationValues.length > 0 && Array.isArray(enumerationValues[0]) ){
            if( enumerationValues.length > 1 ) throw new Error(`When you provide an array of values instead of var args you are only allowed to pass 1 argument.`)
            enumerationValues = enumerationValues[0]
        }
        if( !enumerationValues.length ) throw new Error(`The Enumeration decorator requires one or more allowed values.`)

        // TODO: validate the allowed value types

        const firstEnumValue = enumerationValues[0]

        descriptor.enumerationValues = enumerationValues as (string | number)[]

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        descriptor.itemType = typeof firstEnumValue === 'string' ? String : Number
    })
}
