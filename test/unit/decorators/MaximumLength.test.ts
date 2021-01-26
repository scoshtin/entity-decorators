import { expect } from 'chai'
import ArrayItems from '../../../src/decorators/basic/ArrayItems'
import MaximumLength from '../../../src/decorators/basic/MaximumLength'
import Required from '../../../src/decorators/basic/Required'
import { assertMaximumLengthCollected } from '../../lib/PropertyDescriptorsUtils'


describe( 'MaximumLength decorator', () => {

    it('maximumLength is undefined when not decorated', function() {

        class Clazz {
            @Required() // used just to make sure we collect this property
            string?: string
        }

        assertMaximumLengthCollected({
            Clazz,
            propertyKey: 'string',
            propertyType: String,
            expectedMaximumLength: undefined
        })
    })

    it('collects MaxLength for Strings', function() {

        class Clazz {
            @MaximumLength(4)
            string?: string
        }

        assertMaximumLengthCollected({
            Clazz,
            propertyKey: 'string',
            propertyType: String,
            expectedMaximumLength: 4
        })
    })

    it('collects MinLength for string arrays', function() {

        class Clazz {
            @MaximumLength(5)
            array?: string[]
        }

        assertMaximumLengthCollected({
            Clazz,
            propertyKey: 'array',
            propertyType: Array,
            expectedMaximumLength: 5
        })
    })

    it('collects MinLength for object arrays', function() {

        class Child {
            @MaximumLength(4)
            string?: string
        }

        class Parent {
            @ArrayItems(Child)
            @MaximumLength(3)
            children?: Child[]
        }

        assertMaximumLengthCollected({
            Clazz: Parent,
            propertyKey: 'children',
            propertyType: Array,
            expectedMaximumLength: 3
        })

    })

    it('errors for invalid property types', function() {

        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            class Clazz {
                @MaximumLength(3)
                date?: Date
            }
        }catch( e ) {
            const error = e as Error
            expect(error.message).to.equal('The MaximumLength decorator can only be applied to String or Array properties.')
        }
    })

})
