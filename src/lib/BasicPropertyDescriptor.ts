import AbstractPropertyDescriptor from './AbstractPropertyDescriptor'

export default class DendraPropertyDescriptor extends AbstractPropertyDescriptor {

    required = false
    isISO8601Date = false
    enumerationValues?: (string | number)[]

    minLength?: number
    maxLength?: number

    minimumValue?: number
    maximumValue?: number

    negativeValue?: boolean
    positiveValue?: boolean

    description?: string

}
