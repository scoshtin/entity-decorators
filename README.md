# Entity Decorators

## Decorators

### General
* `Required` - must be populated. Will NOT allow `null` or `undefined` values.
* `Optional` - will allow populated, `null`, or `undefined` values.
* `Description` - provide notes to the swagger generator - shows up on swagger UI.
* `Enumeration` - provide a finite set of allowed values.
* `ArrayItems` - used to define the type of an array of objects. This is required to descend into and extract decorators from the sub objects.
* `SubObject` - used to define to descend into and extract decorators from a sub objects.
* `Scope` - define scopes which are groups of properties. e.g. public, private, etc. 

## Strings
* `MaximumLength` - Maximum string length.
* `MinimumLength` - Minimum string length.
* `Url` - A string that should match a url format.
* `Email` - A string that should match an email format.
* `Phone` - A string that should match a phone format.
* `ISO8601Date` - A string that should match the ISO8601 date format.

## Arrays
* `MaximumLength` - Maximum array length.
* `MinimumLength` - Minimum array length.

## Numbers
* `MaximumValue` - Maximum number value.
* `MinimumValue` - Minimum number value.
* `NegativeValue` - Negative number values only.
* `PositiveValue` - Positive number values only.

## Dates
* `ISO8601Date` - A date field that should match the ISO8601 date format.

## Other
* `CustomSchema` - Provide your own Joi schema for property validation.
* `SchemaOptions` - Provide Joi options to control validation for a single property.
