/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import EntityDescriptor from '../lib/EntityDescriptor'

export default class JoiSchemaTransformer {

    buildSchemaFrom( target: any ): Record<string, unknown> {
        const descriptors = EntityDescriptor.getDescriptorsForClass( target )
        return this.buildSchemaFromDescriptors( descriptors )
    }

    buildSchemaFromDescriptors( _descriptors: EntityDescriptor ): Record<string, unknown> {
        throw new Error('Not implemented yet')
    }

}
