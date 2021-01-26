import { expect } from 'chai'
import ArrayItems from '../../../src/decorators/basic/ArrayItems'
import MinLength from '../../../src/decorators/basic/MinimumLength'
import Required from '../../../src/decorators/basic/Required'
import { assertMinimumLengthCollected } from '../../lib/PropertyDescriptorsUtils'


describe( 'MinimumLength decorator', () => {

    it('minLength is undefined when not decorated', function() {

        class Clazz {
            @Required() // used just to make sure we collect this property
            string?: string
        }

        assertMinimumLengthCollected({
            Clazz,
            propertyKey: 'string',
            propertyType: String,
            expectedMinimumLength: undefined
        })
    })

    it('collects MinLength for Strings', function() {

        class Clazz {
            @MinLength(4)
            string?: string
        }

        assertMinimumLengthCollected({
            Clazz,
            propertyKey: 'string',
            propertyType: String,
            expectedMinimumLength: 4
        })
    })

    it('collects MinLength for string arrays', function() {

        class Clazz {
            @MinLength(5)
            array?: string[]
        }

        assertMinimumLengthCollected({
            Clazz,
            propertyKey: 'array',
            propertyType: Array,
            expectedMinimumLength: 5
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

        assertMinimumLengthCollected({
            Clazz: Parent,
            propertyKey: 'children',
            propertyType: Array,
            expectedMinimumLength: 3
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
            expect(error.message).to.equal('The MinimumLength decorator can only be applied to String or Array properties.')
        }
    })

})
