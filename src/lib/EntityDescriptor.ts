import BasicPropertyDescriptor from './BasicPropertyDescriptor'
import AbstractEntityDescriptor, { Class, PROPERTY_DECORATOR_FUNC } from './AbstractEntityDescriptor'

export { PROPERTY_DECORATOR_FUNC }


export default class EntityDescriptor extends AbstractEntityDescriptor<BasicPropertyDescriptor> {
 
    static get PropertyDescriptorType(){
        return BasicPropertyDescriptor
    }

    static construct( name: string, PropertyDescriptorType: Class ): EntityDescriptor{
        return new EntityDescriptor( name, PropertyDescriptorType )
    }

}