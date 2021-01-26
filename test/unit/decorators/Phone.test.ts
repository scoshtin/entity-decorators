import { expect } from 'chai'
import Phone from '../../../src/decorators/basic/Phone'
import ArrayItems from '../../../src/decorators/basic/ArrayItems'
import Required from '../../../src/decorators/basic/Required'
import { assertKnownFormatCollected } from '../../lib/PropertyDescriptorsUtils'


describe( 'Phone decorator', () => {

    it('knownFormat is undefined when not decorated', function() {
        class Clazz {
            @Required() // used just to make sure we collect this property
            string?: string
        }

        assertKnownFormatCollected({
            Clazz,
            propertyKey: 'string',
            propertyType: String,
            expectedKnownFormat: undefined
        })
    })

    it('collects email knownFormat for strings', function() {
        class Clazz {
            @Phone()
            string?: string
        }

        assertKnownFormatCollected({
            Clazz,
            propertyKey: 'string',
            propertyType: String,
            expectedItemType: undefined,
            expectedKnownFormat: 'phone'
        })
    })

    it('collects email knownFormat for string arrays', function() {
        class Clazz {
            @Phone()
            @ArrayItems(String)
            array?: string[]
        }

        assertKnownFormatCollected({
            Clazz,
            propertyKey: 'array',
            propertyType: Array,
            expectedItemType: String,
            expectedKnownFormat: 'phone',
        })
    })

    it('errors for invalid property types', function() {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            class Clazz {
                @Phone()
                date?: Date
            }
        }catch( e ) {
            const error = e as Error
            expect(error.message).to.equal('The Phone decorator can only be applied to string and string[] properties.')
        }
    })

})
