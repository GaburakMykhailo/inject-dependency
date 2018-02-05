import { fabrica, injectable } from '../../src/inject-dependency'
import Context from '../../src/classes/context'

describe('decorators > injectable', () => {
  @injectable('A')
  class A {}

  it('should return instance of class', () => {
    expect(Context.resolve(A)).toBeInstanceOf(A)
    expect(Context.resolve('A')).toBeInstanceOf(A)
  })
})
