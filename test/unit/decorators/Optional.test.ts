import { expect } from 'chai'
import ArrayItems from '../../../src/decorators/basic/ArrayItems'
import MinimumLength from '../../../src/decorators/basic/MinimumLength'
import Optional from '../../../src/decorators/basic/Optional'
import { assertNotRequiredCollected, assertPropertyCollected, assertRequiredCollected } from '../../lib/PropertyDescriptorsUtils'


describe( 'Optional decorator', () => {

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

    it('collects optional for Strings', function() {
        class Clazz {
            @Optional()
            string?: string
        }

        assertNotRequiredCollected({
            Clazz,
            propertyKey: 'string',
            propertyType: String
        })
    })

    it('collects Required for string arrays', function() {
        class Clazz {
            @Optional()
            array?: string[]
        }

        assertNotRequiredCollected({
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
            @Optional()
            children?: Child[]
        }

        assertNotRequiredCollected({
            Clazz: Parent,
            propertyKey: 'children',
            propertyType: Array
        })

    })

})
