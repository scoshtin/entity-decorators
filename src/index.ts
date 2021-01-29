import 'reflect-metadata'

import ArrayItems from './decorators/basic/ArrayItems'
import Description from './decorators/basic/Description'
import ISO8601Date from './decorators/basic/ISO8601Date'
import Required from './decorators/basic/Required'
import SubObject from './decorators/basic/SubObject'
import BasicPropertyDescriptor from './lib/BasicPropertyDescriptor'
import EntityDescriptor from './lib/EntityDescriptor'
import Email from './decorators/basic/Email'
import Enumeration from './decorators/basic/Enumeration'
import MaximumLength from './decorators/basic/MaximumLength'
import MaximumValue from './decorators/basic/MaximumValue'
import MinimumLength from './decorators/basic/MinimumLength'
import MinimumValue from './decorators/basic/MinimumValue'
import NegativeValue from './decorators/basic/NegativeValue'
import Optional from './decorators/basic/Optional'
import PositiveValue from './decorators/basic/PositiveValue'
import Url from './decorators/basic/Url'
import Scope from './decorators/scopes/Scope'

import JoiSchemaTransformer from './transformers/JoiSchemaTransformer'
// import JSONSchemaTransformer from './transformers/JSONSchemaTransformer'
import PropertyScopesTransformer from './transformers/PropertyScopesTransformer'

export {
    BasicPropertyDescriptor,
    EntityDescriptor,
    JoiSchemaTransformer,
    PropertyScopesTransformer,
    ArrayItems,
    Description,
    Email,
    Enumeration,
    ISO8601Date,
    MaximumLength,
    MaximumValue,
    MinimumLength,
    MinimumValue,
    NegativeValue,
    Optional,
    PositiveValue,
    Required,
    SubObject,
    Url,
    Scope
}
