import { InstanceOfClass, Class } from '../types'
import EntityDescriptor from '../lib/EntityDescriptor'
import BasicPropertyDescriptor from '../lib/BasicPropertyDescriptor'

export default abstract class AbstractTransformer<T> {

    tranformFromEntityInstance( target: InstanceOfClass ): T {
        const descriptors = EntityDescriptor.getDescriptorsForInstance( target )
        return this.tranformFromDescriptors( descriptors )
    }

    tranformFromEntityClass( target: Class ): T {
        const descriptors = EntityDescriptor.getDescriptorsForClass( target )
        return this.tranformFromDescriptors( descriptors )
    }

    abstract tranformFromDescriptors( descriptors: EntityDescriptor<BasicPropertyDescriptor> ): T

}
