import BasicPropertyDescriptor from './BasicPropertyDescriptor'
import AbstractEntityDescriptor from './AbstractEntityDescriptor'
import { Class, InstanceOfClass } from '../types'


export default class EntityDescriptor<T extends BasicPropertyDescriptor> extends AbstractEntityDescriptor<T> {
 
    static get PropertyDescriptorType(): Class {
        return BasicPropertyDescriptor
    }

    static construct( name: string, PropertyDescriptorType: Class ): EntityDescriptor<BasicPropertyDescriptor> {
        return new EntityDescriptor<BasicPropertyDescriptor>( name, PropertyDescriptorType )
    }

    static getDescriptorsForClass( target: Class ): EntityDescriptor<BasicPropertyDescriptor> {
        return this.getDescriptorsFor( target )
    }

    static getDescriptorsForInstance( target: InstanceOfClass ): EntityDescriptor<BasicPropertyDescriptor> {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return this.getDescriptorsFor( target.constructor )
    }

}