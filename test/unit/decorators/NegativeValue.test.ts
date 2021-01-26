import { expect } from 'chai'
import NegativeValue from '../../../src/decorators/basic/NegativeValue'
import Required from '../../../src/decorators/basic/Required'
import { assertNegativeValueCollected, assertPropertyCollected } from '../../lib/PropertyDescriptorsUtils'


describe( 'NegativeValue decorator', () => {

    it('negativeValue is undefined when not decorated', function() {
        class Clazz {
            @Required() // used just to make sure we collect this property
            string?: string
        }

        const descriptors = assertPropertyCollected({
            Clazz,
            propertyKey: 'string',
            propertyType: String
        })
        expect(descriptors.descriptors.string.negativeValue).to.be.undefined
    })

    it('collects negativeValue for numbers', function() {

        class Clazz {
            @NegativeValue()
            number?: number
        }

        assertNegativeValueCollected({
            Clazz,
            propertyKey: 'number',
            propertyType: Number
        })
    })

    it('errors for invalid property types', function() {

        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            class Clazz {
                @NegativeValue()
                date?: Date
            }
        }catch( e ) {
            const error = e as Error
            expect(error.message).to.equal('The NegativeValue decorator can only be applied to number properties.')
        }
    })

})
