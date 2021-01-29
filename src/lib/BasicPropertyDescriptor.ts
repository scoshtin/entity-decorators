import AbstractPropertyDescriptor from './AbstractPropertyDescriptor'

type KNOWN_FORMATS = 'email' | 'phone' | 'url'
export { KNOWN_FORMATS }

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
    stringFormat?: 'email' | 'url' | 'iso8601date'

    scopes?: string[]
}
