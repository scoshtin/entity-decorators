import BasicPropertyDescriptor from '../../lib/BasicPropertyDescriptor'
import EntityDescriptor from '../../lib/EntityDescriptor'
import { PropertyDecoratorFunc } from '../../types'

/**
 * This property is required
 */
export default function Required(): PropertyDecoratorFunc {
    return EntityDescriptor.collectProperty<BasicPropertyDescriptor>(({ descriptor }) => {
        descriptor.required = true
        descriptor.optional = false
    })
}
