import PropertyDescriptors from '../lib/PropertyDescriptors'
import PropertyCollector, { Class, InstanceOfClass } from '../lib/PropertyCollector'
import BasicPropertyDescriptor from '../lib/BasicPropertyDescriptor'

export default abstract class AbstractTransformer<T> {

    tranformFromEntityInstance( target: InstanceOfClass ): T {
        const descriptors = PropertyCollector.getDescriptorsForInstance<BasicPropertyDescriptor>( target )
        return this.tranformFromDescriptors( descriptors )
    }

    tranformFromEntityClass( target: Class | InstanceOfClass ): T {
        const descriptors = PropertyCollector.getDescriptorsForClass<BasicPropertyDescriptor>( target )
        return this.tranformFromDescriptors( descriptors )
    }

    abstract tranformFromDescriptors( descriptors: PropertyDescriptors<BasicPropertyDescriptor> ): T;

}
