import { expect } from 'chai'
import ArrayItems from '../../../src/decorators/basic/ArrayItems'
import MinimumLength from '../../../src/decorators/basic/MinimumLength'
import Required from '../../../src/decorators/basic/Required'
import { assertPropertyCollected, assertRequiredCollected } from '../../lib/PropertyDescriptorsUtils'


describe( 'Required decorator', () => {

    it('required is false when not decorated', function() {
        class Clazz {
            @MinimumLength(4) // used just to make sure we collect this property
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
            @MinimumLength(4)
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

})
