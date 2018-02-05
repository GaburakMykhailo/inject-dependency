import { InjectMeta } from '../interfaces/InjectMeta'
import Context from '../classes/context'
import invariant from '../helpers/invariant'

/**
 * class decorator
 * @param alias
 */
export default function injectable(alias?: any) {
  return function classDecorator<C extends Function>(cls: C) {
    Context._registerAlias(cls, cls)

    if (alias != null) {
      Context._registerAlias(alias, cls)
      Context.bind(alias, cls)
    }

    Context.bind(cls, cls)
  }
}
