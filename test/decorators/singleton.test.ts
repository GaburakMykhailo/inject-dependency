import { singleton, injectable, Context } from '../../src/inject-dependency'
import lazyInject from '../../src/decorators/lazyInject'

describe('decorators > singleton', () => {
  it('should throw error', () => {
    expect(() => {
      @singleton
      class A {}
    }).toThrowError()
  })

  it('should return two instances of class', async () => {
    @singleton
    @injectable()
    class A {}

    expect(Context.resolve(A)).toBe(Context.resolve(A))
  })
})
