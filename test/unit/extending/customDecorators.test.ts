import { expect } from 'chai'
import { BasicPropertyDescriptor, Class, EntityDescriptor, InstanceOfClass, PropertyDecoratorFunc } from '../../../src/index'


describe( 'Custom Decorators', () => {

    // First you need to create a subclass of BasicPropertyDescriptor. This object
    // is used to collect all the details about each decorated property in your entity class.
    // You'll need to define new properties to store any inputs accepted by your custom decorator.
    class TestPropertyDescriptor extends BasicPropertyDescriptor {
        prop1?: string
        prop2?: number
    }

    // You need to extend EntityDescriptor just so you can change the type parameters
    // to use TestPropertyDescriptor. 
    class TestEntityDescriptor extends EntityDescriptor<TestPropertyDescriptor> {

        static get PropertyDescriptorType(): Class {
            return TestPropertyDescriptor
        }
    
        static construct( name: string, PropertyDescriptorType: Class ): EntityDescriptor<TestPropertyDescriptor> {
            return new EntityDescriptor<TestPropertyDescriptor>( name, PropertyDescriptorType )
        }
    
        static getDescriptorsForClass( target: Class ): EntityDescriptor<TestPropertyDescriptor> {
            return this.getDescriptorsFor( target )
        }
    
        static getDescriptorsForInstance( target: InstanceOfClass ): EntityDescriptor<TestPropertyDescriptor> {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            return this.getDescriptorsFor( target.constructor )
        }
    }

    // Next you need to define a new customer decorator. You function should be named appropriately, 
    // accept any inputs required to perform it's function, and match the `PropertyDecoratorFunc` return type. 
    // This is easy because `EntityDescriptor.collectProperty<TestPropertyDescriptor>()` returns the actual
    // decorator function expected by `PropertyDecoratorFunc`. Be sure to provide your property descriptor class
    // as the generic to `EntityDescriptor.collectProperty<YOUR_DESCRIPTOR_HERE>()` to ensure the descriptor passed
    // to your decorator is the correct type.
    function CustomDecorator( prop1: string, prop2: number ): PropertyDecoratorFunc {
        return TestEntityDescriptor.collectProperty<TestPropertyDescriptor>(({ descriptor }) => {
            descriptor.prop1 = prop1
            descriptor.prop2 = prop2
        })
    }

    // Now you can use your new decorator. NOTE: this only collects the new info about your
    // entity classes - Now you have to modify one or more transformers so they can leverage
    // your newly collected properties.
    class TestClass {
        @CustomDecorator( 'string1', 2 )
        someProperty?: string
    }
    
    it('allows custom decorators', function() {
        const classDescriptors = TestEntityDescriptor.getDescriptorsForClass(TestClass)
        expect(classDescriptors.name).to.equal('TestClass')

        const somePropertyDescriptor = classDescriptors.descriptors.someProperty
        expect(somePropertyDescriptor.propertyKey).to.equal('someProperty')
        expect(somePropertyDescriptor.definedIn).to.equal('TestClass')
        expect(somePropertyDescriptor?.prop1).to.equal('string1')
        expect(somePropertyDescriptor?.prop2).to.equal(2)
    })

})
