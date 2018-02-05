import { InjectMeta } from '../interfaces/InjectMeta'
import invariant from '../helpers/invariant'
import noop from '../helpers/noop'
import Context from '../classes/context'

/**
 * property decorator
 * @param clsOrAlias
 * @param callback
 */
export default function lazyInject<C extends Function>(
  clsOrAlias: any,
  callback: (thus: C) => void = noop
) {
  return function propertyDecorator(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    Context._registerLazyDependency(
      target.constructor,
      propertyKey,
      clsOrAlias,
      callback
    )
  }
}
