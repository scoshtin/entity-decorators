import { expect } from 'chai'
import MinLength from '../../../src/decorators/basic/MinimumLength'
import Required from '../../../src/decorators/basic/Required'
import SubObject from '../../../src/decorators/basic/SubObject'
import { assertPropertyCollected } from '../lib/PropertyDescriptorsUtils'


describe( 'SubObject decorator', () => {

    it('SubObject is undefined when not decorated', function() {
        class Child {
            @Required()
            string?: string
        }

        class Parent {
            @MinLength(1) // Needed to collect property
            children?: Child[]
        }

        const descriptor = assertPropertyCollected({
            Clazz: Parent,
            propertyKey: 'children',
            propertyType: Array
        })
        expect(descriptor.descriptors.children.itemType).to.be.undefined
    })

    it('collects sub-objects properly', function() {
        class Child2 {
            @Required()
            string?: string
        }

        class Child1 {
            @SubObject()
            child2?: Child2
        }

        class Parent {
            @SubObject()
            child1?: Child1
        }

        assertPropertyCollected({
            Clazz: Parent,
            propertyKey: 'child1',
            propertyType: Child1
        })

        assertPropertyCollected({
            Clazz: Child1,
            propertyKey: 'child2',
            propertyType: Child2
        })
    })

    it('handles non-class objects', function() {
        class Clazz {
            @SubObject()
            child1?: { string: string }
        }

        assertPropertyCollected({
            Clazz,
            propertyKey: 'child1',
            propertyType: Object
        })
    })

    it('errors for invalid property types', function() {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            class Clazz {
                @SubObject()
                date?: Date
            }
        }catch( e ) {
            const error = e as Error
            expect(error.message).to.equal('The SubObject decorator can only be applied to Object or Array properties.')
        }
    })

    it('errors for arrays of all types', function() {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            class Clazz {
                @SubObject()
                date?: string[]
            }
        }catch( e ) {
            const error = e as Error
            expect(error.message).to.equal('The SubObject decorator can only be applied to Arrays. Use @ArrayItems() instead.')
        }
    })

})
