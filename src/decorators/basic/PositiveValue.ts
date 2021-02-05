import BasicPropertyDescriptor from '../../lib/BasicPropertyDescriptor'
import EntityDescriptor from '../../lib/EntityDescriptor'

/**
 * Property should always be a negative number
 */
const PositiveValue = EntityDescriptor.collectProperty<BasicPropertyDescriptor>(({ descriptor }) => {
    if( descriptor.propertyType !== Number ) throw new Error(`The PositiveValue decorator can only be applied to number properties.`)
    descriptor.positiveValue = true
})
export default PositiveValue