import { StringFormats } from '../types'
import AbstractPropertyDescriptor from './AbstractPropertyDescriptor'

export default class BasicPropertyDescriptor extends AbstractPropertyDescriptor {

    required?: boolean // will not accept null or undefined
    optional?: boolean // will accept null or undefined

    isISO8601Date?: boolean
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
