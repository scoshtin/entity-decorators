/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import BasicPropertyDescriptor from '../lib/BasicPropertyDescriptor'
import EntityDescriptor from '../lib/EntityDescriptor'
import AbstractTransformer from './AbstractTransformer'

type JSONSchema = {

}

export default class JSONSchemaTransformer<T = JSONSchema> extends AbstractTransformer<T> {

    buildSchemaFrom( target: any ): Record<string, unknown> {
        const descriptors = EntityDescriptor.getDescriptorsForClass( target )
        return this.buildSchemaFromDescriptors( descriptors )
    }

    buildSchemaFromDescriptors(_descriptors: EntityDescriptor<BasicPropertyDescriptor>): Record<string, unknown> {
        throw new Error('Method not implemented.')
    }

    tranformFromDescriptors(_descriptor: EntityDescriptor<BasicPropertyDescriptor>): T {
        throw new Error('Method not implemented.')
    }

    processProperty(_descriptor: BasicPropertyDescriptor): T {
        throw new Error('Method not implemented.')
    }

    processStringProperty(_descriptor: BasicPropertyDescriptor): T {
        throw new Error('Method not implemented.')
    }

    processNumberProperty(_descriptor: BasicPropertyDescriptor): T {
        throw new Error('Method not implemented.')
    }

    processBooleanProperty(_descriptor: BasicPropertyDescriptor): T {
        throw new Error('Method not implemented.')
    }

    processDateProperty(_descriptor: BasicPropertyDescriptor): T {
        throw new Error('Method not implemented.')
    }

    processArrayProperty(_descriptor: BasicPropertyDescriptor): T {
        throw new Error('Method not implemented.')
    }

    processObjectProperty(_descriptor: BasicPropertyDescriptor): T {
        throw new Error('Method not implemented.')
    }

}
