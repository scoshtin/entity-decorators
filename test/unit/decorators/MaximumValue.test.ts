import { expect } from 'chai'
import MaxiumValue from '../../../src/decorators/basic/MaximumValue'
import Required from '../../../src/decorators/basic/Required'
import { assertMaximumValueCollected } from '../../lib/PropertyDescriptorsUtils'


describe( 'MaxiumValue decorator', () => {

    it('maximumValue is undefined when not decorated', function() {
        class Clazz {
            @Required() // used just to make sure we collect this property
            string?: string
        }

        assertMaximumValueCollected({
            Clazz,
            propertyKey: 'string',
            propertyType: String,
            expectedMaximumValue: undefined
        })
    })

    it('collects maximumValue for numbers', function() {

        class Clazz {
            @MaxiumValue(4)
            number?: number
        }

        assertMaximumValueCollected({
            Clazz,
            propertyKey: 'number',
            propertyType: Number,
            expectedMaximumValue: 4
        })
    })

    it('errors for invalid property types', function() {

        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            class Clazz {
                @MaxiumValue(3)
                date?: Date
            }
        }catch( e ) {
            const error = e as Error
            expect(error.message).to.equal('The MaximumValue decorator can only be applied to number properties.')
        }
    })

})
