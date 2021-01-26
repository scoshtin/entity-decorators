import Required from '../../../src/decorators/basic/Required'
import Description from '../../../src/decorators/basic/Description'
import { assertDescriptionCollected } from '../lib/PropertyDescriptorsUtils'


describe( 'Description decorator', () => {

    it('description is undefined when not decorated', function() {

        class Clazz {
            @Required() // used just to make sure we collect this property
            string?: string
        }

        assertDescriptionCollected({
            Clazz,
            propertyKey: 'string',
            propertyType: String,
            expectedDescription: undefined
        })
    })

    it('collects Description for Strings', function() {

        class Clazz {
            @Description('this is a test')
            string?: string
        }

        assertDescriptionCollected({
            Clazz,
            propertyKey: 'string',
            propertyType: String,
            expectedDescription: 'this is a test'
        })
    })

})
