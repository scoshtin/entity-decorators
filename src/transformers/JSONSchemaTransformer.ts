import PropertyDescriptors from '../lib/PropertyDescriptors'
import PropertyCollector from '../lib/PropertyCollector'
import BasicPropertyDescriptor from '../lib/BasicPropertyDescriptor'

export default class JoiSchemaTransformer {

    buildSchemaFrom( target: any ): Record<string, unknown> {
        const descriptors = PropertyCollector.getDescriptorsForClass<BasicPropertyDescriptor>( target )
        return this.buildSchemaFromDescriptors( descriptors )
    }

    buildSchemaFromDescriptors( descriptors: PropertyDescriptors<BasicPropertyDescriptor> ): Record<string, unknown> {
        throw new Error('Not implemented yet')
    }

}
