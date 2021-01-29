import JoiSchemaTransformer from '../../../src/transformers/JoiSchemaTransformer'
import { ArrayItems, Email, ISO8601Date, MaximumLength, MinimumLength, Required, SubObject, Url } from '../../../src'
import { expect } from 'chai'

type JoiRule = {
    name: string
    args: {
        limit: number
    }
}

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
    },
    rules?: JoiRule[]
}

describe( 'JoiSchemaTransformer', () => {

    describe('array properties', function(){

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
    
            const transformer = new JoiSchemaTransformer()
            const schema = transformer.tranformFromEntityClass( Parent )
    
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

        it('MinimumLength works for arrays', function() {
            class Child {
                @Required()
                shitCount?: number
            }
    
            class Parent {
                @MinimumLength(3)
                @ArrayItems(Child)
                children?: Child[]
            }
    
            const transformer = new JoiSchemaTransformer()
            const schema = transformer.tranformFromEntityClass( Parent )
    
            const describedSchema = schema.describe() as JoiDescribedSchema
            expect(describedSchema.type).to.equal('object')
    
            const flags = describedSchema.flags as { label: string }
            expect(flags.label).to.equal('Parent')
    
            expect(Object.keys(describedSchema.keys)).to.have.lengthOf(1)
    
            const childrenKey = describedSchema.keys.children
            expect(childrenKey.type).to.equal('array')
            expect(childrenKey.flags?.label).to.equal('children')
            
            expect(childrenKey.rules).to.have.lengthOf(1)

            const childrenRule = childrenKey?.rules?.[0]
            expect(childrenRule?.name).to.equal('min')
            expect(childrenRule?.args.limit).to.equal(3)
        })

    })

    describe( 'object properties', function(){

        it('will descend into sub objects', function() {
            class ChildClass {
                @Required()
                stringProperty?: string
            }

            class ParentClass {
                @SubObject()
                child?: ChildClass
            }
    
            const transformer = new JoiSchemaTransformer()
            const schema = transformer.tranformFromEntityClass( ParentClass )
    
            const describedSchema = schema.describe() as JoiDescribedSchema
            expect(describedSchema.type).to.equal('object')
    
            const flags = describedSchema.flags as { label: string }
            expect(flags.label).to.equal('ParentClass')
    
            expect(Object.keys(describedSchema.keys)).to.have.lengthOf(1)
    
            const childKey = describedSchema.keys.child
            expect(childKey.type).to.equal('object')
            expect(childKey.flags?.label).to.equal('child')
            expect(Object.keys(childKey.keys)).to.have.lengthOf(1)

            const stringPropertyKey = childKey.keys.stringProperty
            expect(stringPropertyKey.type).to.equal('string')
            expect(stringPropertyKey.flags?.label).to.equal('stringProperty')
            expect(stringPropertyKey.flags?.presence).to.equal('required')
        })

    })
    
    describe( 'date properties', function(){

        it('generates iso date schemas for Date properties', function() {
            class DateClass {
                @ISO8601Date()
                date?: Date
            }
    
            const transformer = new JoiSchemaTransformer()
            const schema = transformer.tranformFromEntityClass( DateClass )
    
            const describedSchema = schema.describe() as JoiDescribedSchema
            expect(describedSchema.type).to.equal('object')
    
            const flags = describedSchema.flags as { label: string }
            expect(flags.label).to.equal('DateClass')
    
            expect(Object.keys(describedSchema.keys)).to.have.lengthOf(1)
    
            const dateKey = describedSchema.keys.date
            expect(dateKey.type).to.equal('date')
            expect(dateKey.flags?.format).to.equal('iso')
        })

    })

    describe('string properties', function(){

        it('handles required string properties', function(){
            class StringClass {
                @Required()
                stringProperty?: string
            }
    
            const transformer = new JoiSchemaTransformer()
            const schema = transformer.tranformFromEntityClass( StringClass )
    
            const describedSchema = schema.describe() as JoiDescribedSchema
            expect(describedSchema.type).to.equal('object')
    
            const flags = describedSchema.flags as { label: string }
            expect(flags.label).to.equal('StringClass')
    
            expect(Object.keys(describedSchema.keys)).to.have.lengthOf(1)
    
            const stringDateKey = describedSchema.keys.stringProperty
            expect(stringDateKey.type).to.equal('string')
        })

        it('MinimumLength works for strings', function(){
            class StringClass {
                @MinimumLength(10)
                stringProperty?: string
            }
    
            const transformer = new JoiSchemaTransformer()
            const schema = transformer.tranformFromEntityClass( StringClass )
    
            const describedSchema = schema.describe() as JoiDescribedSchema
            expect(describedSchema.type).to.equal('object')
    
            const flags = describedSchema.flags as { label: string }
            expect(flags.label).to.equal('StringClass')
    
            expect(Object.keys(describedSchema.keys)).to.have.lengthOf(1)
    
            const stringDateKey = describedSchema.keys.stringProperty
            expect(stringDateKey.type).to.equal('string')

            expect(stringDateKey.rules).to.have.length(1)

            const minimumRule = stringDateKey.rules?.[0]
            expect(minimumRule?.name).to.equal('min')
            expect(minimumRule?.args.limit).to.equal(10)
        })

        it('MaximumLength works for strings', function(){
            class StringClass {
                @MaximumLength(10)
                stringProperty?: string
            }
    
            const transformer = new JoiSchemaTransformer()
            const schema = transformer.tranformFromEntityClass( StringClass )
    
            const describedSchema = schema.describe() as JoiDescribedSchema
            expect(describedSchema.type).to.equal('object')
    
            const flags = describedSchema.flags as { label: string }
            expect(flags.label).to.equal('StringClass')
    
            expect(Object.keys(describedSchema.keys)).to.have.lengthOf(1)
    
            const stringDateKey = describedSchema.keys.stringProperty
            expect(stringDateKey.type).to.equal('string')

            expect(stringDateKey.rules).to.have.length(1)

            const minimumRule = stringDateKey.rules?.[0]
            expect(minimumRule?.name).to.equal('max')
            expect(minimumRule?.args.limit).to.equal(10)
        })

        it('MinimumLength & MaximumLength works together', function(){
            class StringClass {
                @MinimumLength(3)
                @MaximumLength(7)
                stringProperty?: string
            }
    
            const transformer = new JoiSchemaTransformer()
            const schema = transformer.tranformFromEntityClass( StringClass )
    
            const describedSchema = schema.describe() as JoiDescribedSchema
            expect(describedSchema.type).to.equal('object')
    
            const flags = describedSchema.flags as { label: string }
            expect(flags.label).to.equal('StringClass')
    
            expect(Object.keys(describedSchema.keys)).to.have.lengthOf(1)
    
            const stringDateKey = describedSchema.keys.stringProperty
            expect(stringDateKey.type).to.equal('string')

            expect(stringDateKey.rules).to.have.length(2)

            const minimumRule = stringDateKey.rules?.[0]
            expect(minimumRule?.name).to.equal('min')
            expect(minimumRule?.args.limit).to.equal(3)

            const maximumRule = stringDateKey.rules?.[1]
            expect(maximumRule?.name).to.equal('max')
            expect(maximumRule?.args.limit).to.equal(7)
        })

        it('Email format works', function(){
            class StringClass {
                @Email()
                stringProperty?: string
            }
    
            const transformer = new JoiSchemaTransformer()
            const schema = transformer.tranformFromEntityClass( StringClass )
    
            const describedSchema = schema.describe() as JoiDescribedSchema
            expect(describedSchema.type).to.equal('object')
    
            const flags = describedSchema.flags as { label: string }
            expect(flags.label).to.equal('StringClass')
    
            expect(Object.keys(describedSchema.keys)).to.have.lengthOf(1)
    
            const stringDateKey = describedSchema.keys.stringProperty
            expect(stringDateKey.type).to.equal('string')
            expect(stringDateKey.flags?.label).to.equal('stringProperty')
            
            expect(stringDateKey.rules).to.have.length(1)

            const rule = stringDateKey.rules?.[0]
            expect(rule?.name).to.equal('email')
        })

        it('Url format works', function(){
            class StringClass {
                @Url()
                stringProperty?: string
            }
    
            const transformer = new JoiSchemaTransformer()
            const schema = transformer.tranformFromEntityClass( StringClass )
    
            const describedSchema = schema.describe() as JoiDescribedSchema
            expect(describedSchema.type).to.equal('object')
    
            const flags = describedSchema.flags as { label: string }
            expect(flags.label).to.equal('StringClass')
    
            expect(Object.keys(describedSchema.keys)).to.have.lengthOf(1)
    
            const stringDateKey = describedSchema.keys.stringProperty
            expect(stringDateKey.type).to.equal('string')
            expect(stringDateKey.flags?.label).to.equal('stringProperty')
            
            expect(stringDateKey.rules).to.have.length(1)

            const rule = stringDateKey.rules?.[0]
            expect(rule?.name).to.equal('uri')
        })

        it('ISO8601Date format works', function(){
            class StringClass {
                @ISO8601Date()
                stringProperty?: string
            }
    
            const transformer = new JoiSchemaTransformer()
            const schema = transformer.tranformFromEntityClass( StringClass )
    
            const describedSchema = schema.describe() as JoiDescribedSchema
            expect(describedSchema.type).to.equal('object')
    
            const flags = describedSchema.flags as { label: string }
            expect(flags.label).to.equal('StringClass')
    
            expect(Object.keys(describedSchema.keys)).to.have.lengthOf(1)
    
            const stringDateKey = describedSchema.keys.stringProperty
            expect(stringDateKey.type).to.equal('date')
            expect(stringDateKey.flags?.label).to.equal('stringProperty')
            expect(stringDateKey.flags?.format).to.equal('iso')
        })

    })

    describe('boolean properties', function(){

        it('handles required boolean properties', function(){
            class BooleanClass {
                @Required()
                booleanProperty?: boolean
            }
    
            const transformer = new JoiSchemaTransformer()
            const schema = transformer.tranformFromEntityClass( BooleanClass )
    
            const describedSchema = schema.describe() as JoiDescribedSchema
            expect(describedSchema.type).to.equal('object')
    
            const flags = describedSchema.flags as { label: string }
            expect(flags.label).to.equal('BooleanClass')
    
            expect(Object.keys(describedSchema.keys)).to.have.lengthOf(1)
    
            const stringDateKey = describedSchema.keys.booleanProperty
            expect(stringDateKey.type).to.equal('boolean')
        })

    })

})