import {
  injectable,
  dependencies,
  Context,
  fabrica,
  lazyInject,
  singleton
} from '../src/inject-dependency'
import invariant from '../src/helpers/invariant'
import { setTimeout } from 'core-js/library/web/timers'

describe('Integration tests', () => {
  it('circular references', () => {
    let resolve
    const promise = new Promise(res => (resolve = res))

    @singleton
    @injectable()
    class A {
      @lazyInject('B', resolve)
      b: B
    }

    @dependencies(A)
    @singleton
    @injectable()
    class B {
      constructor(public a: A) {}
    }

    const a = Context.resolve<A>(A)
    const b = Context.resolve<B>(B)

    promise.then(() => {
      expect(a).toBe(b.a)
      expect(b).toBe(a.b)

      expect(b).toBe(b.a.b)
      expect(a).toBe(a.b.a)
    })
  })

  it('should correctly bind dependency', () => {
    @singleton
    @injectable()
    class A {
      hello() {
        console.log('Hello from A')
      }
    }

    @dependencies(A)
    @injectable()
    class Suu {
      constructor(public a: A) {}
    }

    Context.bind('s', Suu)

    expect(
      Context.resolve<Suu>('s').a === Context.resolve<Suu>('s').a
    ).toBeTruthy()
  })
})
