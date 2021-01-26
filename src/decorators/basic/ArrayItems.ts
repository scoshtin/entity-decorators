import BasicPropertyDescriptor from '../../lib/BasicPropertyDescriptor'
import EntityDescriptor, { PROPERTY_DECORATOR_FUNC } from '../../lib/EntityDescriptor'

/**
 * Declare type type of Array elements
 */
export default function ArrayItems( itemType: any ): PROPERTY_DECORATOR_FUNC {
    return EntityDescriptor.collectProperty<BasicPropertyDescriptor>(({ descriptor }) => {
        if( descriptor.propertyType !== Array && !descriptor.isCustomType ) throw new Error(`The ItemType decorator can only be applied to Object or Array properties.`)
        descriptor.itemType = itemType
    })
}
