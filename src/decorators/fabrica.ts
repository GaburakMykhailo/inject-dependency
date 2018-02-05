import { InjectMeta } from '../interfaces/InjectMeta'
import Context from '../classes/context'
import invariant from '../helpers/invariant'

/**
 * class decorator
 * @param fabrica
 */
export default function fabrica<F extends Function>(fabrica: () => any) {
  return function classDecorator(ctr: Function) {
    invariant(!(fabrica instanceof Function), 'You forgot to pass function')

    const alias = Context._getAlias(ctr)

    const clsMeta = Context._getInjectMeta(ctr)
    const aliasMeta = Context._getInjectMeta(ctr)

    invariant(
      !clsMeta || !aliasMeta,
      'You forget to wrap class in @Injectable decorator first'
    )

    Context.bindFabrica(ctr, fabrica)
    Context.bindFabrica(alias, fabrica)
  }
}
