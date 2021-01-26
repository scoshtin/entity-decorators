import AbstractPropertyDescriptor from './AbstractPropertyDescriptor'

type KNOWN_FORMATS = 'email' | 'phone' | 'url'
export { KNOWN_FORMATS }

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
    knownFormat?: 'email' | 'phone' | 'url'

}
