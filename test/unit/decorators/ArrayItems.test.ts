import { expect } from 'chai'
import ArrayItems from '../../../src/decorators/basic/ArrayItems'
import MinLength from '../../../src/decorators/basic/MinLength'
import Required from '../../../src/decorators/basic/Required'
import { assertArrayItemsTypeCollected } from '../lib/PropertyDescriptorsUtils'


describe( 'ArrayItems decorator', () => {

    it('itemType is undefined when not decorated', function() {
        class Child {
            @Required()
            string?: string
        }

        class Parent {
            @MinLength(1) // Needed to collect property
            children?: Child[]
        }

        assertArrayItemsTypeCollected({
            Clazz: Parent,
            propertyKey: 'children',
            propertyType: Array,
            itemType: undefined
        })
    })

    it('collects ItemType for arrays of child objects', function() {
        class Child {
            @Required()
            string?: string
        }

        class Parent {
            @ArrayItems(Child) // used just to make sure we collect this property
            children?: Child[]
        }

        assertArrayItemsTypeCollected({
            Clazz: Parent,
            propertyKey: 'children',
            propertyType: Array,
            itemType: Child
        })
    })

    it('collects ItemType for sub-objects', function() {
        class Child2 {
            @Required()
            string?: string
        }

        class Child1 {
            @ArrayItems(Child2)
            child2?: Child2
        }

        class Parent {
            @ArrayItems(Child1)
            child1?: Child1
        }

        assertArrayItemsTypeCollected({
            Clazz: Parent,
            propertyKey: 'child1',
            propertyType: Child1,
            itemType: Child1
        })
        assertArrayItemsTypeCollected({
            Clazz: Child1,
            propertyKey: 'child2',
            propertyType: Child2,
            itemType: Child2
        })
    })

    it('errors for invalid property types', function() {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            class Clazz {
                @ArrayItems(String) // the actual type doesn't matter here
                date?: Date
            }
        }catch( e ) {
            const error = e as Error
            expect(error.message).to.equal('The ItemType decorator can only be applied to Object or Array properties.')
        }
    })

})
