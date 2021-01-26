import { expect } from 'chai'
import ArrayItems from '../../../src/decorators/basic/ArrayItems'
import MinLength from '../../../src/decorators/basic/MinLength'
import Required from '../../../src/decorators/basic/Required'
import { assertPropertyCollected, assertRequiredCollected } from '../lib/PropertyDescriptorsUtils'


describe( 'Required decorator', () => {

    it('required is false when not decorated', function() {
        class Clazz {
            @MinLength(4) // used just to make sure we collect this property
            string?: string
        }

        const descriptor = assertPropertyCollected({
            Clazz,
            propertyKey: 'string',
            propertyType: String
        })

        expect(descriptor.descriptors.string.required).to.be.false
    })

    it('collects Required for Strings', function() {
        class Clazz {
            @Required()
            string?: string
        }

        assertRequiredCollected({
            Clazz,
            propertyKey: 'string',
            propertyType: String
        })
    })

    it('collects Required for string arrays', function() {
        class Clazz {
            @Required()
            array?: string[]
        }

        assertRequiredCollected({
            Clazz,
            propertyKey: 'array',
            propertyType: Array
        })
    })

    it('collects Required for object arrays', function() {
        class Child {
            @MinLength(4)
            string?: string
        }

        class Parent {
            @ArrayItems(Child)
            @Required()
            children?: Child[]
        }

        assertRequiredCollected({
            Clazz: Parent,
            propertyKey: 'children',
            propertyType: Array
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
