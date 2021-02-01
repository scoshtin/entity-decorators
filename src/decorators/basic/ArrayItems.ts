import { Class, PropertyDecoratorFunc } from '../../types'
import BasicPropertyDescriptor from '../../lib/BasicPropertyDescriptor'
import EntityDescriptor from '../../lib/EntityDescriptor'

/**
 * Declare type type and extract the properties from items in an Array
 * 
 * @param itemType - The Class type of the items in the array. Required to extract properties from child objects.
 */
export default function ArrayItems( itemType: Class ): PropertyDecoratorFunc {
    return EntityDescriptor.collectProperty<BasicPropertyDescriptor>(({ descriptor }) => {
        if( descriptor.propertyType !== Array && !descriptor.isCustomType ) throw new Error(`The ItemType decorator can only be applied to Object or Array properties.`)
        descriptor.itemType = itemType
    })
}
