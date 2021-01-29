import AbstractPropertyDescriptor from './AbstractPropertyDescriptor'
import { StringFormats } from './StringFormats'

export default class BasicPropertyDescriptor extends AbstractPropertyDescriptor {

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
    stringFormat?: StringFormats

    scopes?: string[]
}
