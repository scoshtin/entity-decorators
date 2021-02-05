import BasicPropertyDescriptor from '../../lib/BasicPropertyDescriptor'
import EntityDescriptor from '../../lib/EntityDescriptor'

/**
 * Property should always be a negative number
 */
const NegativeValue = EntityDescriptor.collectProperty<BasicPropertyDescriptor>(({ descriptor }) => {
    if( descriptor.propertyType !== Number ) throw new Error(`The NegativeValue decorator can only be applied to number properties.`)
    descriptor.negativeValue = true
})
export default NegativeValue