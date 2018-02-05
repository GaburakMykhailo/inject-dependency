import { fabrica, injectable } from '../../src/inject-dependency'
import Context from '../../src/classes/context'

describe('decorators > fabrica', () => {
  const funcFabrica = () => ({})

  it('should throw error', () => {
    expect(() => {
      @fabrica()
      class A {}
    }).toThrowError()

    expect(() => {
      @fabrica()
      @injectable()
      class A {}
    }).toThrowError()

    expect(() => {
      @fabrica(funcFabrica)
      class A {}
    }).toThrowError()
  })

  it('should not throws error', () => {
    expect(() => {
      @fabrica(funcFabrica)
      @injectable()
      class A {}
    }).not.toThrowError()
  })

  it('should return instance that defined in fabrica', () => {
    const instance = {}

    @fabrica(() => instance)
    @injectable()
    class A {}

    expect(Context.resolve(A)).toBe(instance)
    expect(Context.resolve(A)).toBe(instance)
  })
})
