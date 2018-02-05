import { fabrica, injectable, Context } from '../../src/inject-dependency'
import lazyInject from '../../src/decorators/lazyInject'

describe('decorators > lazyInject', () => {
  it('should throw error', () => {
    @injectable()
    class B {}

    class A {
      @lazyInject(B) b
    }

    expect(() => {
      Context.resolve(A)
    }).toThrowError()
  })

  it('should not throws error', async () => {
    const resolveCallback = jest.fn()

    @injectable()
    class B {}

    @injectable()
    class A {
      @lazyInject(B, function(i) {
        resolveCallback(this, i)
      })
      b: B

      @lazyInject(B) b2: B
      @lazyInject(B) b3 = 'defined Stuff'
    }

    const instance = Context.resolve(A)

    await Promise.resolve().then(() => {
      expect(resolveCallback).toHaveBeenCalledWith(instance, instance)
      expect(instance.b2).toBeInstanceOf(B)
      expect(instance.b3).toBe('defined Stuff')
    })
  })
})
