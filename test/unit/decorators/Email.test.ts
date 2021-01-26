import { expect } from 'chai'
import Email from '../../../src/decorators/basic/Email'
import ArrayItems from '../../../src/decorators/basic/ArrayItems'
import Required from '../../../src/decorators/basic/Required'
import { assertKnownFormatCollected, assertMaximumLengthCollected } from '../../lib/PropertyDescriptorsUtils'


describe( 'Email decorator', () => {

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
            @Email()
            string?: string
        }

        assertKnownFormatCollected({
            Clazz,
            propertyKey: 'string',
            propertyType: String,
            expectedItemType: undefined,
            expectedKnownFormat: 'email'
        })
    })

    it('collects email knownFormat for string arrays', function() {
        class Clazz {
            @Email()
            @ArrayItems(String)
            array?: string[]
        }

        assertKnownFormatCollected({
            Clazz,
            propertyKey: 'array',
            propertyType: Array,
            expectedItemType: String,
            expectedKnownFormat: 'email',
        })
    })

    it('errors for invalid property types', function() {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            class Clazz {
                @Email()
                date?: Date
            }
        }catch( e ) {
            const error = e as Error
            expect(error.message).to.equal('The Email decorator can only be applied to string and string[] properties.')
        }
    })

})
