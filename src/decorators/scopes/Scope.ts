import { Class } from '../../lib/AbstractEntityDescriptor'
import BasicPropertyDescriptor from '../../lib/BasicPropertyDescriptor'
import EntityDescriptor, { PROPERTY_DECORATOR_FUNC } from '../../lib/EntityDescriptor'

/**
 * Mark properties as members of scopes. Useful for controlling access to certain properties.
 * 
 * @param scopes - An array or var args of scope names. e.g. 'public', 'private', .etc
 */
export default function Scope( ...scopes: string[] ): PROPERTY_DECORATOR_FUNC {
    return EntityDescriptor.collectProperty<BasicPropertyDescriptor>(({ descriptor }) => {
        descriptor.scopes = scopes
    })
}
