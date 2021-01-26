import { expect } from 'chai'
import MinimumValue from '../../../src/decorators/basic/MinimumValue'
import Required from '../../../src/decorators/basic/Required'
import { assertMinimumValueCollected } from '../../lib/PropertyDescriptorsUtils'


describe( 'MinimumValue decorator', () => {

    it('minimumValue is undefined when not decorated', function() {
        class Clazz {
            @Required() // used just to make sure we collect this property
            string?: string
        }

        assertMinimumValueCollected({
            Clazz,
            propertyKey: 'string',
            propertyType: String,
            expectedMinimumValue: undefined
        })
    })

    it('collects minimumValue for numbers', function() {

        class Clazz {
            @MinimumValue(4)
            number?: number
        }

        assertMinimumValueCollected({
            Clazz,
            propertyKey: 'number',
            propertyType: Number,
            expectedMinimumValue: 4
        })
    })

    it('errors for invalid property types', function() {

        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            class Clazz {
                @MinimumValue(3)
                date?: Date
            }
        }catch( e ) {
            const error = e as Error
            expect(error.message).to.equal('The MinimumValue decorator can only be applied to number properties.')
        }
    })

})
