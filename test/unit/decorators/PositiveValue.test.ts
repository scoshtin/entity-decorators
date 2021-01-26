import { expect } from 'chai'
import PositiveValue from '../../../src/decorators/basic/PositiveValue'
import Required from '../../../src/decorators/basic/Required'
import { assertPositiveValueCollected, assertPropertyCollected } from '../lib/PropertyDescriptorsUtils'


describe( 'PositiveValue decorator', () => {

    it('positiveValue is undefined when not decorated', function() {
        class Clazz {
            @Required() // used just to make sure we collect this property
            string?: string
        }

        const descriptors = assertPropertyCollected({
            Clazz,
            propertyKey: 'string',
            propertyType: String
        })
        expect(descriptors.descriptors.string.positiveValue).to.be.undefined
    })

    it('collects negativeValue for numbers', function() {

        class Clazz {
            @PositiveValue()
            number?: number
        }

        assertPositiveValueCollected({
            Clazz,
            propertyKey: 'number',
            propertyType: Number
        })
    })

    it('errors for invalid property types', function() {

        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            class Clazz {
                @PositiveValue()
                date?: Date
            }
        }catch( e ) {
            const error = e as Error
            expect(error.message).to.equal('The PositiveValue decorator can only be applied to number properties.')
        }
    })

})
