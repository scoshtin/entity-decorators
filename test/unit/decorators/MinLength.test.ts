import { expect } from 'chai'
import ArrayItems from '../../../src/decorators/basic/ArrayItems'
import MinLength from '../../../src/decorators/basic/MinLength'
import Required from '../../../src/decorators/basic/Required'
import { assertMinLengthCollected } from '../lib/PropertyDescriptorsUtils'


describe( 'MinLength decorator', () => {

    it('minLength is undefined when not decorated', function() {

        class Clazz {
            @Required() // used just to make sure we collect this property
            string?: string
        }

        assertMinLengthCollected({
            Clazz,
            propertyKey: 'string',
            propertyType: String,
            expectedMinLength: undefined
        })
    })

    it('collects MinLength for Strings', function() {

        class Clazz {
            @MinLength(4)
            string?: string
        }

        assertMinLengthCollected({
            Clazz,
            propertyKey: 'string',
            propertyType: String,
            expectedMinLength: 4,

        })
    })

    it('collects MinLength for string arrays', function() {

        class Clazz {
            @MinLength(5)
            array?: string[]
        }

        assertMinLengthCollected({
            Clazz,
            propertyKey: 'array',
            propertyType: Array,
            expectedMinLength: 5
        })
    })

    it('collects MinLength for object arrays', function() {

        class Child {
            @MinLength(4)
            string?: string
        }

        class Parent {
            @ArrayItems(Child)
            @MinLength(3)
            children?: Child[]
        }

        assertMinLengthCollected({
            Clazz: Parent,
            propertyKey: 'children',
            propertyType: Array,
            expectedMinLength: 3
        })

    })

    it('errors for invalid property types', function() {

        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            class Clazz {
                @MinLength(3)
                date?: Date
            }
        }catch( e ) {
            const error = e as Error
            expect(error.message).to.equal('The MinLength decorator can only be applied to String or Array properties.')
        }
    })

})
