import AbstractPropertyDescriptor from './AbstractPropertyDescriptor'

export default class DendraPropertyDescriptor extends AbstractPropertyDescriptor {

    required = false
    isISO8601Date = false
    minLength?: number
    maxLength?: number

    minimumValue?: number
    maximumValue?: number
    
    description?: string

}
