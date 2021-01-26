/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import BasicPropertyDescriptor from '../../lib/BasicPropertyDescriptor'
import PropertyCollector, { PROPERTY_DECORATOR_FUNC } from '../../lib/PropertyCollector'

/**
 * Declare type type of Array elements and sub objects
 */
export default function SubObject(): PROPERTY_DECORATOR_FUNC {
    return PropertyCollector.collectProperty( BasicPropertyDescriptor, (descriptor: BasicPropertyDescriptor) => {
        if( descriptor.propertyType === Array ) throw new Error(`The SubObject decorator can only be applied to Arrays. Use @ArrayItems() instead.`)
        if( !descriptor.isCustomType ) throw new Error(`The SubObject decorator can only be applied to Object or Array properties.`)
    })
}
