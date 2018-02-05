import { dependencies, injectable } from '../../src/inject-dependency'

describe('decorators > dependencies', () => {
  class B {}

  it('should throw error', () => {
    expect(() => {
      @dependencies()
      class A {}
    }).toThrowError()

    expect(() => {
      @dependencies(B)
      class A {}
    }).toThrowError()
  })

  it('should not throws error', () => {
    expect(() => {
      @dependencies()
      @injectable()
      class A {}
    }).not.toThrowError()

    expect(() => {
      @dependencies(B)
      @injectable()
      class A {}
    }).not.toThrowError()
  })
})
