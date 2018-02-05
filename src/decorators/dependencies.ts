import { InjectMeta } from '../interfaces/InjectMeta'
import Context from '../classes/context'
import invariant from '../helpers/invariant'

/**
 * class decorator
 * @param clsOrAliases
 */
export default function dependencies(...clsOrAliases: any[]) {
  return function classDecorator(constructor: Function) {
    const meta = Context._getInjectMeta(constructor)
    const metaAlias = Context._getInjectMeta(Context._getAlias(constructor))

    invariant(!meta, 'You forget to wrap class in @Injectable decorator first')

    meta.dependencies.push(...clsOrAliases)
    metaAlias.dependencies.push(...clsOrAliases)
  }
}
