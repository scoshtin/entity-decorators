import EntityDescriptor from '../lib/EntityDescriptor'
import { Class } from '../lib/AbstractEntityDescriptor'
import AbstractTransformer from './AbstractTransformer'
import BasicPropertyDescriptor from '../lib/BasicPropertyDescriptor'

class EntityScope {

    scope: string
    properties: string[] = []

    constructor( scope: string ) {
        this.scope = scope
    }

    addProperty( propertyKey: string ) {
        this.properties.push( propertyKey )
    }

    mergeSubScope( propertyKey: string, subScope: EntityScope ) {
        if( subScope.scope !== this.scope ) return // only accept matching scopes
        for( const subPropertyKey of subScope.properties ) {
            this.addProperty(`${propertyKey}.${subPropertyKey}`)
        }
    }

}

export { EntityScope }

export default class PropertyScopesTransformer extends AbstractTransformer<EntityScope[]> {
    
    tranformFromDescriptors(entityDescriptor: EntityDescriptor): EntityScope[] {
        let allScopes: Record<string, EntityScope> = {}

        for( const propertyDescriptor of entityDescriptor ) {
            this.recordScopes( allScopes, propertyDescriptor )
            if( this.shouldRecurseIntoChildProperties( propertyDescriptor ) ) {
                this.processChildProperties( allScopes, propertyDescriptor )
            }
        }

        return Object.keys(allScopes).reduce( ( output: EntityScope[] , key: string ) => {
            const scope = allScopes[key]
            output.push( scope )
            return output
        }, [] )
    }

    recordScopes( allScopes: Record<string, EntityScope>, propertyDescriptor: BasicPropertyDescriptor ): void {
        if( !propertyDescriptor.scopes ) return
        for( const scopeName of propertyDescriptor.scopes ) {
            const scope = this.findOrCreateScope( allScopes, scopeName )
            scope.addProperty( propertyDescriptor.propertyKey )
        }
    }

    shouldRecurseIntoChildProperties( propertyDescriptor: BasicPropertyDescriptor ): Boolean {
        return propertyDescriptor.isArrayWithCustomType || propertyDescriptor.isCustomType
    }

    processChildProperties( allScopes: Record<string, EntityScope>, propertyDescriptor: BasicPropertyDescriptor ){
         // TODO: handle child objects here by dotting the paths
         const subScopes = this.tranformFromEntityClass( propertyDescriptor.itemType )
         for( const subScope of subScopes ) {
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
