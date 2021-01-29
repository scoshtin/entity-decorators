import { expect } from 'chai'
import { Required, ArrayItems, EntityDescriptor } from '../../src'

describe( 'EntityDescriptor', () => {

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

        const descriptors = EntityDescriptor.getDescriptorsForClass(Parent)
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

        const descriptors = EntityDescriptor.getDescriptorsForClass(NumberClass)
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

        const descriptors = EntityDescriptor.getDescriptorsForClass(StringClass)
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

        const descriptors = EntityDescriptor.getDescriptorsForClass(DateClass)
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

        const descriptors = EntityDescriptor.getDescriptorsForClass(StringClass2)
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

        const classDescriptors = EntityDescriptor.getDescriptorsForClass(SomeClass)
        expect(Object.keys(classDescriptors.descriptors)).to.have.lengthOf(2)

        const instanceDescriptors = EntityDescriptor.getDescriptorsForInstance(new SomeClass())
        expect(Object.keys(instanceDescriptors.descriptors)).to.have.lengthOf(2)

        expect(JSON.stringify(classDescriptors)).to.equal(JSON.stringify(instanceDescriptors))
    })

})