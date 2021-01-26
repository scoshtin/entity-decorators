import { expect } from 'chai'
import { BasicPropertyDescriptor, PropertyCollector, Required, ArrayItems } from '../../src'

describe( 'PropertyCollector', () => {

    it('handles arrays of other decorated objects', function() {
        class Child {
            @Required()
            shitCount?: number
        }

        class Parent {
            @Required()
            @ArrayItems(Child)
            children?: Child[]
        }

        const descriptors = PropertyCollector.getDescriptorsForClass<BasicPropertyDescriptor>(Parent)
        expect(descriptors.name).to.equal('Parent')
        expect(Object.keys(descriptors.descriptors)).to.have.lengthOf(1)

        const childrenDescriptor = descriptors.descriptors.children
        expect(childrenDescriptor.definedIn).to.equal('Parent')
        expect(childrenDescriptor.propertyKey).to.equal('children')
        expect(childrenDescriptor.propertyType).to.equal(Array)
        expect(childrenDescriptor.propertyTypeName).to.equal('Array')
        expect(childrenDescriptor.itemType).to.equal(Child)
        expect(childrenDescriptor.required).to.be.true
    })

    it('handles number properties', function() {
        class NumberClass {
            @Required()
            count?: number
        }

        const descriptors = PropertyCollector.getDescriptorsForClass<BasicPropertyDescriptor>(NumberClass)
        expect(descriptors.name).to.equal('NumberClass')
        expect(Object.keys(descriptors.descriptors)).to.have.lengthOf(1)

        const countDescriptor = descriptors.descriptors.count
        expect(countDescriptor.definedIn).to.equal('NumberClass')
        expect(countDescriptor.propertyKey).to.equal('count')
        expect(countDescriptor.propertyType).to.equal(Number)
        expect(countDescriptor.propertyTypeName).to.equal('Number')
        expect(countDescriptor.itemType).to.be.not.ok
        expect(countDescriptor.required).to.be.true
    })

    it('handles string properties', function() {
        class StringClass {
            @Required()
            someString?: string
        }

        const descriptors = PropertyCollector.getDescriptorsForClass<BasicPropertyDescriptor>(StringClass)
        expect(descriptors.name).to.equal('StringClass')
        expect(Object.keys(descriptors.descriptors)).to.have.lengthOf(1)

        const stringDescriptor = descriptors.descriptors.someString
        expect(stringDescriptor.definedIn).to.equal('StringClass')
        expect(stringDescriptor.propertyKey).to.equal('someString')
        expect(stringDescriptor.propertyType).to.equal(String)
        expect(stringDescriptor.propertyTypeName).to.equal('String')
        expect(stringDescriptor.itemType).to.be.not.ok
        expect(stringDescriptor.required).to.be.true
    })

    it('handles date properties', function() {
        class DateClass {
            @Required()
            someDate?: Date
        }

        const descriptors = PropertyCollector.getDescriptorsForClass<BasicPropertyDescriptor>(DateClass)
        expect(descriptors.name).to.equal('DateClass')
        expect(Object.keys(descriptors.descriptors)).to.have.lengthOf(1)

        const stringDescriptor = descriptors.descriptors.someDate
        expect(stringDescriptor.definedIn).to.equal('DateClass')
        expect(stringDescriptor.propertyKey).to.equal('someDate')
        expect(stringDescriptor.propertyType).to.equal(Date)
        expect(stringDescriptor.propertyTypeName).to.equal('Date')
        expect(stringDescriptor.itemType).to.be.not.ok
        expect(stringDescriptor.required).to.be.true
    })

    it('handles inheritance', function() {
        class StringClass1 {
            @Required()
            someString1?: string
        }

        class StringClass2 extends StringClass1 {
            @Required()
            someString2?: string
        }

        const descriptors = PropertyCollector.getDescriptorsForClass<BasicPropertyDescriptor>(StringClass2)
        expect(descriptors.name).to.equal('StringClass2')
        expect(Object.keys(descriptors.descriptors)).to.have.lengthOf(2)

        const someString1Descriptor = descriptors.descriptors.someString1
        expect(someString1Descriptor.definedIn).to.equal('StringClass1')
        expect(someString1Descriptor.propertyKey).to.equal('someString1')
        expect(someString1Descriptor.propertyType).to.equal(String)
        expect(someString1Descriptor.propertyTypeName).to.equal('String')
        expect(someString1Descriptor.itemType).to.be.not.ok
        expect(someString1Descriptor.required).to.be.true

        const someString2Descriptor = descriptors.descriptors.someString2
        expect(someString2Descriptor.definedIn).to.equal('StringClass2')
        expect(someString2Descriptor.propertyKey).to.equal('someString2')
        expect(someString2Descriptor.propertyType).to.equal(String)
        expect(someString2Descriptor.propertyTypeName).to.equal('String')
        expect(someString2Descriptor.itemType).to.be.not.ok
        expect(someString2Descriptor.required).to.be.true
    })

    it('returns the same descriptors for classes and instances', function() {
        class SomeClass {
            @Required()
            someString1?: string

            @Required()
            someString2?: number
        }

        const classDescriptors = PropertyCollector.getDescriptorsForClass<BasicPropertyDescriptor>(SomeClass)
        expect(Object.keys(classDescriptors.descriptors)).to.have.lengthOf(2)

        const instanceDescriptors = PropertyCollector.getDescriptorsForInstance<BasicPropertyDescriptor>(new SomeClass())
        expect(Object.keys(instanceDescriptors.descriptors)).to.have.lengthOf(2)

        expect(JSON.stringify(classDescriptors)).to.equal(JSON.stringify(instanceDescriptors))
    })

})