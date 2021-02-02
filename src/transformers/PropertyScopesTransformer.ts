import EntityDescriptor from '../lib/EntityDescriptor'
import BasicPropertyDescriptor from '../lib/BasicPropertyDescriptor'
import { InstanceOfClass, Class } from '../types'

class EntityScope {

    scope: string
    properties: string[] = []

    constructor( scope: string ) {
        this.scope = scope
    }

    addProperty( propertyKey: string ): void {
        this.properties.push( propertyKey )
    }

    mergeSubScope( propertyKey: string, subScope: EntityScope ): void {
        if( subScope.scope !== this.scope ) return // only accept matching scopes
        for( const subPropertyKey of subScope.properties ) {
            this.addProperty(`${propertyKey}.${subPropertyKey}`)
        }
    }

}

export { EntityScope }

export default class PropertyScopesTransformer {

    namedScopeFromEntityClass( target: Class, scopeName: string ): EntityScope {
        const scopes = this.allScopesFromEntityClass( target )
        return scopes[scopeName]
    }

    namedScopeFromEntityInstance( target: InstanceOfClass, scopeName: string ): EntityScope {
        const scopes = this.allScopesFromEntityInstance( target )
        return scopes[scopeName]
    }

    allScopesFromEntityInstance( target: InstanceOfClass ): Record<string, EntityScope> {
        const descriptors = EntityDescriptor.getDescriptorsForClass( target )
        return this.allScopesFromEntityDescriptor( descriptors )
    }

    allScopesFromEntityClass( target: Class ): Record<string, EntityScope> {
        const descriptors = EntityDescriptor.getDescriptorsForClass( target )
        return this.allScopesFromEntityDescriptor( descriptors )
    }

    allScopesFromEntityDescriptor(entityDescriptor: EntityDescriptor<BasicPropertyDescriptor>): Record<string, EntityScope> {
        const allScopes: Record<string, EntityScope> = {}

        for( const propertyDescriptor of entityDescriptor ) {
            this.recordScopes( allScopes, propertyDescriptor )
            if( this.shouldRecurseIntoChildProperties( propertyDescriptor ) ) {
                this.processChildProperties( allScopes, propertyDescriptor )
            }
        }

        return allScopes
    }

    recordScopes( allScopes: Record<string, EntityScope>, propertyDescriptor: BasicPropertyDescriptor ): void {
        if( !propertyDescriptor.scopes ) return
        for( const scopeName of propertyDescriptor.scopes ) {
            const scope = this.findOrCreateScope( allScopes, scopeName )
            scope.addProperty( propertyDescriptor.propertyKey )
        }
    }

    shouldRecurseIntoChildProperties( propertyDescriptor: BasicPropertyDescriptor ): boolean {
        return propertyDescriptor.isArrayWithCustomType || propertyDescriptor.isCustomType
    }

    processChildProperties( allScopes: Record<string, EntityScope>, propertyDescriptor: BasicPropertyDescriptor ): void {
         const subScopes = this.allScopesFromEntityClass( propertyDescriptor.itemType )
         for( const subScopeName in subScopes ) {
             const subScope = subScopes[subScopeName]
             const parentScope = this.findOrCreateScope( allScopes, subScope.scope )
             if( parentScope ) {
                 parentScope.mergeSubScope( propertyDescriptor.propertyKey, subScope )
             }
         }
    }

    findOrCreateScope( allScopes: Record<string, EntityScope>, scopeName: string ): EntityScope {
        let scope = allScopes[scopeName]
        if( scope ) return scope
        scope = allScopes[scopeName] = new EntityScope( scopeName )
        return scope
    }

}
