import { expect } from 'chai'
import Url from '../../../src/decorators/basic/Url'
import ArrayItems from '../../../src/decorators/basic/ArrayItems'
import Required from '../../../src/decorators/basic/Required'
import { assertStringFormatCollected } from '../../lib/PropertyDescriptorsUtils'


describe( 'Url decorator', () => {

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

    it('collects email format for strings', function() {
        class Clazz {
            @Url
            string?: string
        }

        assertStringFormatCollected({
            Clazz,
            propertyKey: 'string',
            propertyType: String,
            expectedItemType: undefined,
            expectedStringFormat: 'url'
        })
    })

    it('collects email format for string arrays', function() {
        class Clazz {
            @Url
            @ArrayItems(String)
            array?: string[]
        }

        assertStringFormatCollected({
            Clazz,
            propertyKey: 'array',
            propertyType: Array,
            expectedItemType: String,
            expectedStringFormat: 'url',
        })
    })

    it('errors for invalid property types', function() {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            class Clazz {
                @Url
                date?: Date
            }
        }catch( e ) {
            const error = e as Error
            expect(error.message).to.equal('The Url decorator can only be applied to string and string[] properties.')
        }
    })

})
