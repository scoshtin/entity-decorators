import JoiSchemaTransformer from '../../../src/transformers/JoiSchemaTransformer'
import { ArrayItems, ISO8601Date, PropertyCollector, Required, BasicPropertyDescriptor } from '../../../src'
import { expect } from 'chai'

type JoiDescribedSchema = {
    type: string,
    flags?: {
        presence?: string,
        label?: string,
        format?: string
    },
    items?: JoiDescribedSchema[],
    keys: {
        [key: string]: JoiDescribedSchema
    }
}

describe.only( 'JoiSchemaTransformer', () => {

    it('generates schemas for objects with arrays of other objects', function() {
        class Child {
            @Required()
            shitCount?: number
        }

        class Parent {
            @Required()
            @ArrayItems(Child)
            children?: Child[]
        }

        const descriptors = PropertyCollector.getDescriptorsForClass<BasicPropertyDescriptor>(Parent)
        const builder = new JoiSchemaTransformer()
        const schema = builder.buildSchemaFromDescriptors( descriptors )

        const describedSchema = schema.describe() as JoiDescribedSchema
        expect(describedSchema.type).to.equal('object')

        const flags = describedSchema.flags as { label: string }
        expect(flags.label).to.equal('Parent')

        expect(Object.keys(describedSchema.keys)).to.have.lengthOf(1)

        const childrenKey = describedSchema.keys.children
        expect(childrenKey.type).to.equal('array')
        expect(childrenKey.flags?.presence).to.equal('required')
        expect(childrenKey.items).to.have.lengthOf(1)

        if( !childrenKey.items ) throw new Error(`Array was not set`)

        const [childItem] = childrenKey.items
        expect(childItem.type).to.equal('object')
        expect(childItem.flags?.label).to.equal('Child')
        expect(Object.keys(childItem.keys)).to.have.lengthOf(1)

        const shitCountNumber = childItem.keys.shitCount
        expect(shitCountNumber.type).to.equal('number')
        expect(shitCountNumber.flags?.label).to.equal('shitCount')
        expect(shitCountNumber.flags?.presence).to.equal('required')
    })

    it('generates iso date schemas for Date properties', function() {
        class DateClass {
            @ISO8601Date()
            date?: Date
        }

        const descriptors = PropertyCollector.getDescriptorsForClass<BasicPropertyDescriptor>(DateClass)
        const builder = new JoiSchemaTransformer()
        const schema = builder.buildSchemaFromDescriptors( descriptors )

        const describedSchema = schema.describe() as JoiDescribedSchema
        expect(describedSchema.type).to.equal('object')

        const flags = describedSchema.flags as { label: string }
        expect(flags.label).to.equal('DateClass')

        expect(Object.keys(describedSchema.keys)).to.have.lengthOf(1)

        const dateKey = describedSchema.keys.date
        expect(dateKey.type).to.equal('date')
        expect(dateKey.flags?.format).to.equal('iso')
    })

    it('generates iso date schemas for String properties', function() {
        class StringDateClass {
            @ISO8601Date()
            stringDate?: string
        }

        const descriptors = PropertyCollector.getDescriptorsForClass<BasicPropertyDescriptor>(StringDateClass)
        const builder = new JoiSchemaTransformer()
        const schema = builder.buildSchemaFromDescriptors( descriptors )

        const describedSchema = schema.describe() as JoiDescribedSchema
        expect(describedSchema.type).to.equal('object')

        const flags = describedSchema.flags as { label: string }
        expect(flags.label).to.equal('StringDateClass')

        expect(Object.keys(describedSchema.keys)).to.have.lengthOf(1)

        const stringDateKey = describedSchema.keys.stringDate
        expect(stringDateKey.type).to.equal('date')
        expect(stringDateKey.flags?.format).to.equal('iso')
    })

})