# Entity Decorators

This project contains a set of typescript decorators that allow you to mark up your typescript entity classes. You
can then use transformers to convert the decorators to things like json schemas and [Joi Schemas](https://joi.dev). You can also write your
own decorators and transformers to do whatever you need. Here's what it looks like:

```javascript
export default class Entity {

    @Required()
    @MinimumLength(6)
    firstName: string

    @Optional()
    @MinimumValue(1)
    articleCount: number

    @Required()
    @Enumeration( UserTypes.member, UserTypes.owner )
    userType: UserTypes

    @Required()
    @SubObject( Address )
    address: Address

    @Required()
    @ArrayItems( ContactMethod )
    @MinimumLength(1)
    contactMethods: ContactMethod[]

}
```

You can then use this class to generate a schema using a tranformer like this:

```javascript
const transformer = new JoiSchemaTransformer()
const entityJoiSchema = transformer.tranformFromEntityClass( Entity )
entityJoiSchema.validate( entity )
```

If you use [Hapi](https://hapi.dev/tutorials/validation/?lang=en_US) or [Fastify](https://www.fastify.io/docs/latest/Validation-and-Serialization/) you can use transformers to generate schemas for your routes. These schemas can even
be used to generate OpenAPI documentation for your APIs:

**HAPI ( gives you runtime validation and Swagger or OpenAPI documentation )**
```javascript
const transformer = new JoiSchemaTransformer()

server.route({
    method: 'POST',
    path: '/post',
    options: {
        validate: {
            payload: transformer.tranformFromEntityClass( RoutePostBody )
        }
    },
    handler( request, h ) { ... }
})
```

**FASTIFY -> COMING SOON**
```javascript
const transformer = new JsonSchemaTransformer()

fastify.post('/post', {
  handler () {},
  schema: {
    body: transformer.tranformFromEntityClass( RoutePostBody )
  }
})
```

## Decorators

### General
* `Required` - must be populated. Will NOT allow `null` or `undefined` values.
* `Optional` - will allow populated, `null`, or `undefined` values.
* `Description` - provide notes to the swagger generator - shows up on swagger UI.
* `Enumeration` - provide a finite set of allowed values.
* `SubObject` - used to define to descend into and extract decorators from a sub objects.
* `Scope` - define scopes which are groups of properties. e.g. public, private, etc. 

### Strings
* `MinimumLength` - Minimum string length.
* `MaximumLength` - Maximum string length.
* `Url` - A string that should match a url format.
* `Email` - A string that should match an email format.
* `Phone` - A string that should match a phone format.
* `ISO8601Date` - A string that should match the ISO8601 date format.

### Arrays
* `ArrayItems` - used to define the type of an array of objects. This is required to descend into and extract decorators from the sub objects.
* `MinimumLength` - Minimum array length.
* `MaximumLength` - Maximum array length.

### Numbers
* `MinimumValue` - Minimum number value.
* `MaximumValue` - Maximum number value.
* `NegativeValue` - Negative number values only.
* `PositiveValue` - Positive number values only.

### Dates
* `ISO8601Date` - A date field that should match the ISO8601 date format.

## Contributing

We'd love help fixing bugs and adding new capabilities. Send us a PR :)