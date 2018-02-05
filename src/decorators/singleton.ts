import { InjectMeta } from '../interfaces/InjectMeta'
import Context from '../classes/context'
import invariant from '../helpers/invariant'
import classToFunction from '../helpers/classToFunction'
import once from '../helpers/once'

/**
 * class decorator
 * @param ctr
 */
export default function singleton(ctr: Function) {
  const alias = Context._getAlias(ctr)
  invariant(!alias, 'You forget to wrap class in @Injectable decorator first')

  Context.bindFabrica(ctr, once(classToFunction(ctr)))
  Context.bindFabrica(alias, once(classToFunction(ctr)))
}
