import Joi, { AnySchema } from 'joi'
import BasicPropertyDescriptor from '../lib/BasicPropertyDescriptor'
import AbstractTransformer from './AbstractTransformer'
import EntityDescriptor from '../lib/EntityDescriptor'
// import { EntityTransformerOptions } from '../types'


class JoiSchemaTransformer<T extends AnySchema = AnySchema> extends AbstractTransformer<T> {

    // private options?: EntityTransformerOptions<AnySchema>

    // constructor( options?: EntityTransformerOptions<AnySchema> ) {
    //     super()
    //     this.options = options
    // }

    tranformFromDescriptors(descriptors: EntityDescriptor<BasicPropertyDescriptor>): T {
        const schemas: Record<string, AnySchema> = {}
        for( const descriptor of descriptors ) {
            schemas[descriptor.propertyKey]  = this.processProperty( descriptor )
        }
        return Joi.object(schemas).label(descriptors.name) as unknown as T
    }

    processProperty( descriptor: BasicPropertyDescriptor ): T {
        let property:AnySchema | undefined
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

        // I'm unhappy about using $_getFlag() but it seems like the only way to check if the schema already has a label
        if( !property.$_getFlag('label') ) property = property.label( descriptor.propertyKey )

        return property as unknown as T
    }

    processStringProperty( descriptor: BasicPropertyDescriptor ): T {
        if( descriptor.stringFormat === 'iso8601date' ) {
            return Joi.date().iso() as unknown as T
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

        // let output: AnySchema = schema
        // if( descriptor.custom && this.options?.customHandlers ) {
        //     for( const customDecorator in this.options.customHandlers ) {
        //         const handlerFuncs = this.options.customHandlers[customDecorator]
        //         for( const customDecoratorHandler of handlerFuncs ) {
        //             output = customDecoratorHandler( output, descriptor )
        //         }
        //     }
        // }

        return schema as unknown as T
    }

    processNumberProperty( _descriptor: BasicPropertyDescriptor ): T {
        const schema = Joi.number()
        return schema as unknown as T
    }

    processBooleanProperty( _descriptor: BasicPropertyDescriptor ): T {
        const schema = Joi.boolean()
        return schema as unknown as T
    }

    processDateProperty( descriptor: BasicPropertyDescriptor ): T {
        let schema = Joi.date()

        if( descriptor.stringFormat === 'iso8601date' ) {
            schema = schema.iso()
        }

        return schema as unknown as T
    }

    processArrayProperty( descriptor: BasicPropertyDescriptor ): T {
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

        return schema as unknown as T
    }

    processObjectProperty( descriptor: BasicPropertyDescriptor ): T {
        const itemSchema = this.tranformFromEntityClass( descriptor.propertyType )
        return itemSchema
    }

}

export default JoiSchemaTransformer