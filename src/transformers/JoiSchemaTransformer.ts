import Joi, { AnySchema, ObjectSchema } from 'joi'
import PropertyDescriptors from '../lib/PropertyDescriptors'
import PropertyCollector from '../lib/PropertyCollector'
import BasicPropertyDescriptor from '../lib/BasicPropertyDescriptor'


class JoiSchemaTransformer {

    buildSchemaFrom( target: any ): AnySchema {
        const descriptors = PropertyCollector.getDescriptorsForClass<BasicPropertyDescriptor>( target )
        return this.buildSchemaFromDescriptors( descriptors )
    }

    buildSchemaFromDescriptors( descriptors: PropertyDescriptors<BasicPropertyDescriptor> ): ObjectSchema {
        return this.buildObject( descriptors )
    }

    private buildObject( descriptors: PropertyDescriptors<BasicPropertyDescriptor> ): ObjectSchema {
        if( !descriptors ) return Joi.object()

        const schemas: Record<string, AnySchema> = {}
        for( const propertyKey in descriptors.descriptors ) {
            const descriptor = descriptors.descriptors[propertyKey]
            const propertySchema = this.processProperty( descriptor )
            schemas[propertyKey] = this.processPropertyForCommonDecorators( descriptor, propertySchema )
        }

        return Joi.object(schemas).label(descriptors.name)
    }

    private processPropertyForCommonDecorators( descriptor: BasicPropertyDescriptor, schema: AnySchema ): AnySchema {
        if( descriptor.required ) schema = schema.required()
        return schema
    }

    private processProperty( descriptor: BasicPropertyDescriptor ): AnySchema {
        let property = null
        switch( descriptor.propertyTypeName ) {
            case 'String':
                property = this.processStringProperty( descriptor )
                break
            case 'Number':
                property = this.processNumberProperty( descriptor )
                break
            case 'Boolean':
                property = this.processBooleanProperty( descriptor )
                break
            case 'Date':
                property = this.processDateProperty( descriptor )
                break
            case 'Array':
                property = this.processArrayProperty( descriptor )
                break
            default:
                if( descriptor.itemType ) {
                    property = this.processObjectProperty( descriptor )
                }
        }
        if( !property ) throw new Error(`Unknown type: ${descriptor.propertyKey} -> ${descriptor.propertyTypeName}`)
        return property.label( descriptor.propertyKey )
    }

    private processStringProperty( descriptor: BasicPropertyDescriptor ): AnySchema {
        if( descriptor.isISO8601Date ) {
            return Joi.date().iso()
        }

        let schema = Joi.string()

        if( descriptor.minLength ) {
            schema = schema.min( descriptor.minLength )
        }

        if( descriptor.maxLength ) {
            schema = schema.max( descriptor.maxLength )
        }

        return schema
    }

    private processNumberProperty( _descriptor: BasicPropertyDescriptor ): AnySchema {
        const schema = Joi.number()
        return schema
    }

    private processBooleanProperty( _descriptor: BasicPropertyDescriptor ): AnySchema {
        const schema = Joi.boolean()
        return schema
    }

    private processDateProperty( descriptor: BasicPropertyDescriptor ): AnySchema {
        let schema = Joi.date()

        if( descriptor.isISO8601Date ) {
            schema = schema.iso()
        }

        return schema
    }

    private processArrayProperty( descriptor: BasicPropertyDescriptor ): AnySchema {
        let schema = Joi.array()

        if( descriptor.itemType ) {
            const itemSchema = this.buildSchemaFrom( descriptor.itemType )
            schema = schema.items( itemSchema )
        }

        if( descriptor.minLength ) {
            schema = schema.min( descriptor.minLength )
        }

        if( descriptor.maxLength ) {
            schema = schema.max( descriptor.maxLength )
        }

        return schema
    }

    private processObjectProperty( _descriptor: BasicPropertyDescriptor ): ObjectSchema {
        return Joi.object()
    }

}

export default JoiSchemaTransformer