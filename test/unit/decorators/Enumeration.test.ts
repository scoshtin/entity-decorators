import { expect } from 'chai'
import Enumeration from '../../../src/decorators/basic/Enumeration'
import Required from '../../../src/decorators/basic/Required'
import { assertEnumerationValuesCollected } from '../lib/PropertyDescriptorsUtils'


describe( 'Enumeration decorator', () => {

    it('allowedValues is undefined when not decorated', function() {

        class Clazz {
            @Required() // used just to make sure we collect this property
            string?: string
        }

        assertEnumerationValuesCollected({
            Clazz,
            propertyKey: 'string',
            propertyType: String,
            expectedEnumerationValues: undefined
        })
    })

    it('collects allowedValues for strings', function() {

        class Clazz {
            @Enumeration('one', 'two', 'three')
            string?: string
        }

        assertEnumerationValuesCollected({
            Clazz,
            propertyKey: 'string',
            propertyType: String,
            expectedEnumerationValues: ['one', 'two', 'three']
        })
    })

    it('collects allowedValues for number', function() {

        class Clazz {
            @Enumeration(1, 2, 3)
            number?: number
        }

        assertEnumerationValuesCollected({
            Clazz,
            propertyKey: 'number',
            propertyType: Number,
            expectedEnumerationValues: [1, 2, 3]
        })
    })


    it('errors for invalid property types', function() {

        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            class Clazz {
                @Enumeration(1, 2, 3)
                date?: Date
            }
        }catch( e ) {
            const error = e as Error
            expect(error.message).to.equal('The Enumeration decorator can only be applied to String or Number properties.')
        }
    })

})
