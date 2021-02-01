import BasicPropertyDescriptor from '../../lib/BasicPropertyDescriptor'
import EntityDescriptor from '../../lib/EntityDescriptor'
import { PropertyDecoratorFunc } from '../../types'

/**
 * Mark properties as members of scopes. Useful for controlling access to certain properties.
 * 
 * @param scopes - An array or var args of scope names. e.g. 'public', 'private', .etc
 */
export default function Scope( ...scopes: string[] ): PropertyDecoratorFunc {
    return EntityDescriptor.collectProperty<BasicPropertyDescriptor>(({ descriptor }) => {
        descriptor.scopes = scopes
    })
}
