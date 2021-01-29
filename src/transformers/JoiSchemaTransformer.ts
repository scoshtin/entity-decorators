import Joi, { AnySchema, ObjectSchema } from 'joi'
import BasicPropertyDescriptor from '../lib/BasicPropertyDescriptor'
import AbstractTransformer from './AbstractTransformer'
import EntityDescriptor from '../lib/EntityDescriptor'


class JoiSchemaTransformer extends AbstractTransformer<ObjectSchema> {

    tranformFromDescriptors(descriptors: EntityDescriptor): ObjectSchema {
        const schemas: Record<string, AnySchema> = {}
        for( const descriptor of descriptors ) {
            schemas[descriptor.propertyKey]  = this.processProperty( descriptor )
        }
        return Joi.object(schemas).label(descriptors.name)
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
                if( descriptor.isCustomType ) {
                    property = this.processObjectProperty( descriptor )
                }
        }
        if( !property ) throw new Error(`Unknown type: ${descriptor.propertyKey} -> ${descriptor.propertyTypeName}`)

        // things common to all schemas - e.g. @Required
        if( descriptor.required ) property = property.required()
        
        return property.label( descriptor.propertyKey )
    }

    private processStringProperty( descriptor: BasicPropertyDescriptor ): AnySchema {
        if( descriptor.stringFormat === 'iso8601date' ) {
            return Joi.date().iso()
        } 

        let schema = Joi.string()

        if( descriptor.minLength ) {
            schema = schema.min( descriptor.minLength )
        }

        if( descriptor.maxLength ) {
            schema = schema.max( descriptor.maxLength )
        }

        if( descriptor.stringFormat === 'email' ) {
            schema = schema.email()
        }else if( descriptor.stringFormat === 'url' ) {
            schema = schema.uri()
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

        if( descriptor.stringFormat === 'iso8601date' ) {
            schema = schema.iso()
        }

        return schema
    }

    private processArrayProperty( descriptor: BasicPropertyDescriptor ): AnySchema {
        let schema = Joi.array()

        if( descriptor.itemType ) {
            const itemSchema = this.tranformFromEntityClass( descriptor.itemType )
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

    private processObjectProperty( descriptor: BasicPropertyDescriptor ): ObjectSchema {
        const itemSchema = this.tranformFromEntityClass( descriptor.propertyType )
        return itemSchema
    }

}

export default JoiSchemaTransformer