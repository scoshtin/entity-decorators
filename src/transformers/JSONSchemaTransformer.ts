import EntityPropertyDescriptors from '../lib/EntityDescriptor'
import PropertyCollector from '../lib/PropertyCollector'
import BasicPropertyDescriptor from '../lib/BasicPropertyDescriptor'

export default class JoiSchemaTransformer {

    buildSchemaFrom( target: any ): Record<string, unknown> {
        const descriptors = PropertyCollector.getDescriptorsForClass<BasicPropertyDescriptor>( target )
        return this.buildSchemaFromDescriptors( descriptors )
    }

    buildSchemaFromDescriptors( descriptors: EntityPropertyDescriptors<BasicPropertyDescriptor> ): Record<string, unknown> {
        throw new Error('Not implemented yet')
    }

}
