import { expect } from 'chai'
import Enumeration from '../../../src/decorators/basic/Enumeration'
import Required from '../../../src/decorators/basic/Required'
import { assertEnumerationValuesCollected } from '../../lib/PropertyDescriptorsUtils'


describe( 'Enumeration decorator', () => {

    it('allowedValues is undefined when not decorated', function() {
        class Clazz {
            @Required // used just to make sure we collect this property
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

    it('will accept an array as the first argument instead of var args', function() {
        class Clazz {
            @Enumeration(['one', 'two', 'three'])
            string?: string
        }

        assertEnumerationValuesCollected({
            Clazz,
            propertyKey: 'string',
            propertyType: String,
            expectedEnumerationValues: ['one', 'two', 'three']
        })
    })

    it('blows up when you use an array of values and provide more than 1 argument', function() {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            class Clazz {
                @Enumeration(['one', 'two', 'three'], 'this should cause an error')
                string?: string
            }
        }catch( e ) {
            const error = e as Error
            expect(error.message).to.equal('When you provide an array of values instead of var args you are only allowed to pass 1 argument.')
        }
    })

    it('blows up when you don\'t provide arguments', function() {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            class Clazz {
                @Enumeration()
                string?: string
            }
        }catch( e ) {
            const error = e as Error
            expect(error.message).to.equal('The Enumeration decorator requires one or more allowed values.')
        }
    })

})
