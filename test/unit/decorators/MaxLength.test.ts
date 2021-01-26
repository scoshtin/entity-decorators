import { expect } from 'chai'
import ArrayItems from '../../../src/decorators/basic/ArrayItems'
import MaxLength from '../../../src/decorators/basic/MaxLength'
import Required from '../../../src/decorators/basic/Required'
import { assertMaxLengthCollected } from '../lib/PropertyDescriptorsUtils'


describe( 'MaxLength decorator', () => {

    it('maxLength is undefined when not decorated', function() {

        class Clazz {
            @Required() // used just to make sure we collect this property
            string?: string
        }

        assertMaxLengthCollected({
            Clazz,
            expectedMaxLength: undefined,
            propertyKey: 'string',
            propertyType: String
        })
    })

    it('collects MinLength for Strings', function() {

        class Clazz {
            @MaxLength(4)
            string?: string
        }

        assertMaxLengthCollected({
            Clazz,
            expectedMaxLength: 4,
            propertyKey: 'string',
            propertyType: String
        })
    })

    it('collects MinLength for string arrays', function() {

        class Clazz {
            @MaxLength(5)
            array?: string[]
        }

        assertMaxLengthCollected({
            Clazz,
            expectedMaxLength: 5,
            propertyKey: 'array',
            propertyType: Array
        })
    })

    it('collects MinLength for object arrays', function() {

        class Child {
            @MaxLength(4)
            string?: string
        }

        class Parent {
            @ArrayItems(Child)
            @MaxLength(3)
            children?: Child[]
        }

        assertMaxLengthCollected({
            Clazz: Parent,
            expectedMaxLength: 3,
            propertyKey: 'children',
            propertyType: Array
        })

    })

    it('errors for invalid property types', function() {

        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            class Clazz {
                @MaxLength(3)
                date?: Date
            }
        }catch( e ) {
            const error = e as Error
            expect(error.message).to.equal('The MaxLength decorator can only be applied to String or Array properties.')
        }
    })

})
