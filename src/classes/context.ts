import once from '../helpers/once'
import classToFunction from '../helpers/classToFunction'
import invariant from '../helpers/invariant'
import { LazyInject } from '../interfaces/LazyInject'
import { InjectMeta } from '../interfaces/InjectMeta'

/**
 * Context exists in singleton for all app
 */
export default class Context {
  private static _fabrics: Map<any, Function> = new Map()
  private static _meta: Map<any, InjectMeta> = new Map()
  private static _aliases: Map<any, any> = new Map()
  private static _injects: Map<any, LazyInject> = new Map()

  /**
   * @private
   */
  static _getAlias(clsOrAlias: any): any {
    return Context._aliases.get(clsOrAlias)
  }

  /**
   * @private
   */
  static _registerAlias(cls: any, als: any) {
    Context._aliases.set(cls, als)
    Context._aliases.set(als, cls)
  }

  /**
   * @private
   */
  static _resolveLazy(clsOrAlias: any): LazyInject {
    if (!Context._injects.has(clsOrAlias)) {
      let resolve: any
      const promise = new Promise(res => (resolve = res))

      Context._injects.set(clsOrAlias, {
        resolve,
        promise
      })
    }

    return Context._injects.get(clsOrAlias) as LazyInject
  }

  /**
   * @private
   */
  static _getInjectMeta(cls: Function): InjectMeta {
    const clsMeta = Context._meta.get(cls)

    invariant(clsMeta == null, 'Meta not exists')

    return clsMeta as InjectMeta
  }

  /**
   * @private
   */
  static _initMetaIfNotExists(targetClsOrAlias: any) {
    if (Context._meta.get(targetClsOrAlias)) return

    Context._meta.set(targetClsOrAlias, {
      dependencies: [],
      lazyDependencies: new Map()
    })
  }

  /**
   * @private
   */
  static _registerLazyDependency(
    clsOrAlias: any,
    key: string,
    dependency: any,
    callback: Function
  ) {
    Context._initMetaIfNotExists(clsOrAlias)
    const meta = Context._getInjectMeta(clsOrAlias)

    meta.lazyDependencies.set(key, {
      clsOrAlias: dependency,
      callback
    })
  }

  static bind(targetClsOrAlias: any, cls: Function) {
    Context.bindFabrica(targetClsOrAlias, classToFunction(cls))

    return Context
  }

  static bindFabrica<T>(targetClsOrAlias: Function, fabrica: () => T) {
    Context._initMetaIfNotExists(targetClsOrAlias)

    Context._fabrics.set(targetClsOrAlias, fabrica)

    const lazyMeta = Context._resolveLazy(targetClsOrAlias)
    lazyMeta.resolve()

    return Context
  }

  static resolve<C>(clsOrAlias: any): C {
    const fabrica = Context._fabrics.get(clsOrAlias) as Function

    invariant(
      fabrica == null,
      `Class not wrapped in @injectable decorator or alias is not exist')`
    )

    const meta = Context._getInjectMeta(clsOrAlias)

    const instance = fabrica(...meta.dependencies.map(d => Context.resolve(d)))

    meta.lazyDependencies.forEach(({ clsOrAlias, callback }, propertyKey) => {
      Context._resolveLazy(clsOrAlias).promise.then(() => {
        if (instance[propertyKey] !== undefined) return

        instance[propertyKey] = Context.resolve(clsOrAlias)
        callback.call(instance, instance)
      })
    })

    return instance
  }
}
