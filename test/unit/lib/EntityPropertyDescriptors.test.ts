import { expect } from 'chai'
import { BasicPropertyDescriptor, EntityDescriptor } from '../../../src'

describe( 'EntityPropertyDescriptors', () => {

    it('iteration works on populated descriptors', function() {
        class FakeType {
            string1?: string
            number2?: number
            boolean3?: boolean
            date4?: Date
        }
    
        const descriptors = new EntityDescriptor('Test', BasicPropertyDescriptor )
        descriptors.addNewProperty( FakeType, 'string1', String )
        descriptors.addNewProperty( FakeType, 'number2', Number )
        descriptors.addNewProperty( FakeType, 'boolean3', Boolean )
        descriptors.addNewProperty( FakeType, 'date4', Date )

        const iteratedDescriptors = []
        for( const descriptor of descriptors ) {
            iteratedDescriptors.push(descriptor)
        }
        expect(iteratedDescriptors).to.have.length(4)

        const [stringDescriptor, numberDescriptor, booleanDescriptor, dateDescriptor] = iteratedDescriptors
        expect(stringDescriptor.propertyKey).to.equal('string1')
        expect(numberDescriptor.propertyKey).to.equal('number2')
        expect(booleanDescriptor.propertyKey).to.equal('boolean3')
        expect(dateDescriptor.propertyKey).to.equal('date4')
    })

    it('iteration works on empty descriptors', function() {
        const descriptors = new EntityDescriptor('Test', BasicPropertyDescriptor)
    
        const iteratedDescriptors = []
        for( const descriptor of descriptors ) {
            iteratedDescriptors.push(descriptor)
        }

        expect(iteratedDescriptors).to.have.length(0)
    })

})
