import BasicPropertyDescriptor from '../../lib/BasicPropertyDescriptor'
import EntityDescriptor from '../../lib/EntityDescriptor'

/**
 * This property is optional: undefined or null will be allowed
 */
const Optional = EntityDescriptor.collectProperty<BasicPropertyDescriptor>(({ descriptor }) => {
    descriptor.required = false
    descriptor.optional = true
})
export default Optional
