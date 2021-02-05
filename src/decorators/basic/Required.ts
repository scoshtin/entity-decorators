import BasicPropertyDescriptor from '../../lib/BasicPropertyDescriptor'
import EntityDescriptor from '../../lib/EntityDescriptor'

/**
 * This property is required
 */
const Required = EntityDescriptor.collectProperty<BasicPropertyDescriptor>(({ descriptor }) => {
    descriptor.required = true
    descriptor.optional = false
})
export default Required