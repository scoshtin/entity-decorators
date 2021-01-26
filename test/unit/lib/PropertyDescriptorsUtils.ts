import { expect } from 'chai'
import BasicPropertyDescriptor from '../../../src/lib/BasicPropertyDescriptor'
import PropertyCollector from '../../../src/lib/PropertyCollector'
import PropertyDescriptors from '../../../src/lib/PropertyDescriptors'

type AssertPropertyCollectedParams = {
    Clazz: new (...args: any[]) => any,
    propertyKey: string,
    propertyType: { name: string }
}

type AssertMinimumLengthCollectedParams = AssertPropertyCollectedParams & {
    expectedMinimumLength: number | undefined
}

type AssertMaximumLengthCollectedParams = AssertPropertyCollectedParams & {
    expectedMaximumLength: number | undefined
}

type AssertMinimumValueCollectedParams = AssertPropertyCollectedParams & {
    expectedMinimumValue: number | undefined
}

type AssertMaximumValueCollectedParams = AssertPropertyCollectedParams & {
    expectedMaximumValue: number | undefined
}

type AssertDescriptionCollectedParams = AssertPropertyCollectedParams & {
    expectedDescription: string | undefined
}

type AssertArrayItemsPropertyCollectedParams = AssertPropertyCollectedParams & {
    itemType: (new(...args: any[]) => any) | undefined
}

type AssertEnumerationValuesPropertyCollectedParams = AssertPropertyCollectedParams & {
    expectedEnumerationValues: (string | number)[] | undefined
}


export {
    AssertPropertyCollectedParams,
    AssertMinimumLengthCollectedParams,
    AssertMaximumLengthCollectedParams,
    AssertArrayItemsPropertyCollectedParams,
    AssertDescriptionCollectedParams,
    AssertMinimumValueCollectedParams,
    AssertMaximumValueCollectedParams,
    AssertEnumerationValuesPropertyCollectedParams
}

export function assertPropertyCollected( options: AssertPropertyCollectedParams ): PropertyDescriptors<BasicPropertyDescriptor> {
    const descriptors = PropertyCollector.getDescriptorsForClass<BasicPropertyDescriptor>(options.Clazz)
    expect(descriptors.name).to.equal(options.Clazz.name)
    expect(Object.keys(descriptors.descriptors)).to.have.lengthOf(1)

    const childrenDescriptor = descriptors.descriptors[options.propertyKey]
    if( !childrenDescriptor ) throw new Error(`You've used the wrong property name: ${options.propertyKey} !== ${Object.keys(descriptors.descriptors)[0]}`)

    expect(childrenDescriptor.definedIn).to.equal(options.Clazz.name)
    expect(childrenDescriptor.propertyKey).to.equal(options.propertyKey)
    expect(childrenDescriptor.propertyType).to.equal(options.propertyType)
    expect(childrenDescriptor.propertyTypeName).to.equal(options.propertyType.name)

    return descriptors
}

export function assertMinimumLengthCollected( options: AssertMinimumLengthCollectedParams ): PropertyDescriptors<BasicPropertyDescriptor> {
    const descriptors = assertPropertyCollected( options )
    const childrenDescriptor = descriptors.descriptors[options.propertyKey]
    expect(childrenDescriptor.minLength).to.equal(options.expectedMinimumLength)
    return descriptors
}

export function assertMaximumLengthCollected( options: AssertMaximumLengthCollectedParams ): PropertyDescriptors<BasicPropertyDescriptor> {
    const descriptors = assertPropertyCollected( options )
    const childrenDescriptor = descriptors.descriptors[options.propertyKey]
    expect(childrenDescriptor.maxLength).to.equal(options.expectedMaximumLength)
    return descriptors
}

export function assertMinimumValueCollected( options: AssertMinimumValueCollectedParams ): PropertyDescriptors<BasicPropertyDescriptor> {
    const descriptors = assertPropertyCollected( options )
    const childrenDescriptor = descriptors.descriptors[options.propertyKey]
    expect(childrenDescriptor.minimumValue).to.equal(options.expectedMinimumValue)
    return descriptors
}

export function assertMaximumValueCollected( options: AssertMaximumValueCollectedParams ): PropertyDescriptors<BasicPropertyDescriptor> {
    const descriptors = assertPropertyCollected( options )
    const childrenDescriptor = descriptors.descriptors[options.propertyKey]
    expect(childrenDescriptor.maximumValue).to.equal(options.expectedMaximumValue)
    return descriptors
}

export function assertDescriptionCollected( options: AssertDescriptionCollectedParams ): PropertyDescriptors<BasicPropertyDescriptor> {
    const descriptors = assertPropertyCollected( options )
    const childrenDescriptor = descriptors.descriptors[options.propertyKey]
    expect(childrenDescriptor.description).to.equal(options.expectedDescription)
    return descriptors
}

export function assertRequiredCollected( options: AssertPropertyCollectedParams ): PropertyDescriptors<BasicPropertyDescriptor> {
    const descriptors = assertPropertyCollected( options )
    const childrenDescriptor = descriptors.descriptors[options.propertyKey]
    expect(childrenDescriptor.required).to.be.true
    return descriptors
}

export function assertNotRequiredCollected( options: AssertPropertyCollectedParams ): PropertyDescriptors<BasicPropertyDescriptor> {
    const descriptors = assertPropertyCollected( options )
    const childrenDescriptor = descriptors.descriptors[options.propertyKey]
    expect(childrenDescriptor.required).to.be.false
    return descriptors
}

export function assertArrayItemsTypeCollected( options: AssertArrayItemsPropertyCollectedParams ): PropertyDescriptors<BasicPropertyDescriptor> {
    const descriptors = assertPropertyCollected( options )
    const childrenDescriptor = descriptors.descriptors[options.propertyKey]
    expect(childrenDescriptor.itemType).to.equal(options.itemType)
    return descriptors
}

export function assertEnumerationValuesCollected( options: AssertEnumerationValuesPropertyCollectedParams ): PropertyDescriptors<BasicPropertyDescriptor> {
    const descriptors = assertPropertyCollected( options )
    const childrenDescriptor = descriptors.descriptors[options.propertyKey]
    expect(childrenDescriptor.enumerationValues).to.deep.equal(options.expectedEnumerationValues)
    return descriptors
}

export function assertNegativeValueCollected( options: AssertPropertyCollectedParams ): PropertyDescriptors<BasicPropertyDescriptor> {
    const descriptors = assertPropertyCollected( options )
    const childrenDescriptor = descriptors.descriptors[options.propertyKey]
    expect(childrenDescriptor.negativeValue).to.be.true
    return descriptors
}

export function assertPositiveValueCollected( options: AssertPropertyCollectedParams ): PropertyDescriptors<BasicPropertyDescriptor> {
    const descriptors = assertPropertyCollected( options )
    const childrenDescriptor = descriptors.descriptors[options.propertyKey]
    expect(childrenDescriptor.positiveValue).to.be.true
    return descriptors
}