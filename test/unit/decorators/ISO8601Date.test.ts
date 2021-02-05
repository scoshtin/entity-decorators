import { expect } from 'chai'
import ISO8601Date from '../../../src/decorators/basic/ISO8601Date'
import ArrayItems from '../../../src/decorators/basic/ArrayItems'
import Required from '../../../src/decorators/basic/Required'
import { assertStringFormatCollected } from '../../lib/PropertyDescriptorsUtils'

describe( 'ISO8601Date decorator', () => {

    it('string format is undefined when not decorated', function() {
        class Clazz {
            @Required // used just to make sure we collect this property
            string?: string
        }

        assertStringFormatCollected({
            Clazz,
            propertyKey: 'string',
            propertyType: String,
            expectedStringFormat: undefined
        })
    })

    it('collects iso date format for strings', function() {
        class Clazz {
            @ISO8601Date
            string?: string
        }

        assertStringFormatCollected({
            Clazz,
            propertyKey: 'string',
            propertyType: String,
            expectedItemType: undefined,
            expectedStringFormat: 'iso8601date'
        })
    })

    it('collects iso date format for string arrays', function() {
        class Clazz {
            @ISO8601Date
            @ArrayItems(String)
            array?: string[]
        }

        assertStringFormatCollected({
            Clazz,
            propertyKey: 'array',
            propertyType: Array,
            expectedItemType: String,
            expectedStringFormat: 'iso8601date',
        })
    })

    it('errors for invalid property types', function() {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            class Clazz {
                @ISO8601Date
                number?: number
            }
        }catch( e ) {
            const error = e as Error
            expect(error.message).to.equal('The ISO8601Date decorator can only be applied to Date, String, or String[] properties.')
        }

        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            class Clazz {
                @ISO8601Date
                number?: number[]
            }
        }catch( e ) {
            const error = e as Error
            expect(error.message).to.equal('The ISO8601Date decorator can only be applied to Date, String, or String[] properties.')
        }
    })

})
