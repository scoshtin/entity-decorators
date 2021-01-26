import { expect } from 'chai'
import Url from '../../../src/decorators/basic/Url'
import ArrayItems from '../../../src/decorators/basic/ArrayItems'
import Required from '../../../src/decorators/basic/Required'
import { assertKnownFormatCollected, assertMaximumLengthCollected } from '../lib/PropertyDescriptorsUtils'


describe( 'Url decorator', () => {

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
            @Url()
            string?: string
        }

        assertKnownFormatCollected({
            Clazz,
            propertyKey: 'string',
            propertyType: String,
            expectedItemType: undefined,
            expectedKnownFormat: 'url'
        })
    })

    it('collects email knownFormat for string arrays', function() {
        class Clazz {
            @Url()
            @ArrayItems(String)
            array?: string[]
        }

        assertKnownFormatCollected({
            Clazz,
            propertyKey: 'array',
            propertyType: Array,
            expectedItemType: String,
            expectedKnownFormat: 'url',
        })
    })

    it('errors for invalid property types', function() {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            class Clazz {
                @Url()
                date?: Date
            }
        }catch( e ) {
            const error = e as Error
            expect(error.message).to.equal('The Url decorator can only be applied to string and string[] properties.')
        }
    })

})
