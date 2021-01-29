# Entity Decorators

This project contains a set of typescript decorators that allow you to mark up your typescript entity classes. You
can then use transformers to convert the decorators to things like json schemas and [Joi Schemas](https://joi.dev). You can also write your
own decorators and transformers to do whatever you need. Here's what it looks like:

```
export default class Entity {

    @Required()
    @MinimumLength(6)
    firstName: string

    @Required()
    @MinimumValue(1)
    articleCount: number

    @Required()
    @Enumeration( UserTypes.member, UserTypes.owner )
    userType: UserTypes

}
```

You can then use this class to generate a schema using a tranformer like this:

```
const transformer = new JoiSchemaTransformer()
const schema = transformer.tranformFromEntityClass( Parent )
schema.validate( entity )
```

If you use [Hapi](https://hapi.dev/tutorials/validation/?lang=en_US) or [Fastify](https://www.fastify.io/docs/latest/Validation-and-Serialization/) you can use transformers to generate schema for your routes. These schemas can also
be used to generate OpenAPI documentation for your APIs:

HAPI ( gives you runtime validation and Swagger or OpenAPI documentation ):
```
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
```

FASTIFY: COMING SOON:
```
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
