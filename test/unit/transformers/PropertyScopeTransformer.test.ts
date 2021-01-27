import { ArrayItems, Scope } from '../../../src'
import { expect } from 'chai'
import PropertyScopesTransformer from '../../../src/transformers/PropertyScopesTransformer'

describe( 'PropertyScopeTransformer', () => {

    it('generates schemas for objects with arrays of other objects', function() {

        class Child {
            @Scope('public')
            publicChildValue?: number

            @Scope('private')
            privateChildValue?: number
        }

        class Parent {

            @ArrayItems(Child)
            children?: Child[]

            @Scope('public')
            publicValue?: number

            @Scope('private')
            privateValue?: string

        }

        const transformer = new PropertyScopesTransformer()
        const scopes = transformer.tranformFromEntityClass( Parent )

        expect(scopes).to.have.length(2)

        const [publicScope] = scopes.filter( s => s.scope === 'public' )
        const [privateScope] = scopes.filter( s => s.scope === 'private' )

        expect(publicScope.scope).to.equal('public')
        expect(publicScope.properties).to.have.length(2)
        expect(publicScope.properties).to.deep.equal(['children.publicChildValue', 'publicValue'])

        expect(privateScope.scope).to.equal('private')
        expect(privateScope.properties).to.have.length(2)
        expect(privateScope.properties).to.deep.equal(['children.privateChildValue', 'privateValue'])
    })

})