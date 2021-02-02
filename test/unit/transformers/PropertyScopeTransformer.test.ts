import { ArrayItems, Scope } from '../../../src'
import { expect } from 'chai'
import PropertyScopesTransformer from '../../../src/transformers/PropertyScopesTransformer'

describe( 'PropertyScopeTransformer', () => {

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

    it('generates scopes for nested objects', function() {
        const transformer = new PropertyScopesTransformer()
        const scopes = transformer.allScopesFromEntityClass( Parent )

        expect(Object.keys(scopes)).to.have.length(2)

        const { public: publicScope, private: privateScope } = scopes
       
        expect(publicScope.scope).to.equal('public')
        expect(publicScope.properties).to.have.length(2)
        expect(publicScope.properties).to.deep.equal(['children.publicChildValue', 'publicValue'])

        expect(privateScope.scope).to.equal('private')
        expect(privateScope.properties).to.have.length(2)
        expect(privateScope.properties).to.deep.equal(['children.privateChildValue', 'privateValue'])
    })

    it('allows getting a named scope', function() {
        const transformer = new PropertyScopesTransformer()
        const publicScope = transformer.namedScopeFromEntityClass( Parent, 'public' )

        expect(publicScope.scope).to.equal('public')
        expect(publicScope.properties).to.have.length(2)
        expect(publicScope.properties).to.deep.equal(['children.publicChildValue', 'publicValue'])
    })

    it('does not explode when a named scope does not exist', function() {
        const transformer = new PropertyScopesTransformer()
        const publicScope = transformer.namedScopeFromEntityClass( Parent, 'doesnt exist' )

        expect(publicScope).to.be.undefined
    })

    it('does not explode when instance is not an object', function() {
        const transformer = new PropertyScopesTransformer()
        const publicScope = transformer.namedScopeFromEntityInstance( 'notanobject', 'doesnt exist' )
        expect(publicScope).to.be.undefined
    })

})