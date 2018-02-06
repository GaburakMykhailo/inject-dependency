[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Greenkeeper badge](https://badges.greenkeeper.io/alexjoverm/typescript-library-starter.svg)](https://greenkeeper.io/)
[![Travis](https://img.shields.io/travis/alexjoverm/typescript-library-starter.svg)](https://travis-ci.org/GaburakMykhailo/inject-dependency)
[![Coveralls](https://img.shields.io/coveralls/alexjoverm/typescript-library-starter.svg)](https://coveralls.io/github/GaburakMykhailo/inject-dependency)
[![Dev Dependencies](https://david-dm.org/alexjoverm/typescript-library-starter/dev-status.svg)](https://david-dm.org/alexjoverm/GaburakMykhailo/inject-dependency?type=dev)
# Library for DI with global container underhood 
This library was inpired by AngularJS

```sh
  npm i inject-dependency
```

---
## Typescript Example:
```typescript
    import {Context, singleton, injectable, dependencies, lazyInject, fabrica} from 'inject-dependency'

    @singleton
    @injectable()
    class A {
      @lazyInject<C>('C', a => a.c.hello())
      c: C;

      hello() {
        console.log('A');
      }
    }

    @singleton
    @dependencies(A)
    @injectable()
    class B {
      constructor(public a: A) {}

      hello() {
        console.log('B');
      }
    }
    @singleton
    @dependencies(B)
    @injectable('C')
    class C {
      constructor(public b: B) {}

      hello() {
        console.log('C');
      }
    }

    const cInstance = Context.resolve<C>(C);

    cInstance.b.a.hello();
    cInstance.b.hello();
    cInstance.hello();

    /*
      A
      B
      C
      C
    */
```

## ES7 Example:
```js
    import {Context, singleton, injectable, dependencies, lazyInject, fabrica} from 'inject-dependency'

    @singleton
    @injectable()
    class A {
      @lazyInject('C', a => a.c.hello()) 
      c;

      hello() {
        console.log('A');
      }
    }

    @singleton
    @dependencies(A)
    @injectable()
    class B {
      constructor(a) {
        this.a = a
      }

      hello() {
        console.log('B');
      }
    }
    @singleton
    @dependencies(B)
    @injectable('C')
    class C {
      constructor(b) {
        this.b = b
      }

      hello() {
        console.log('C');
      }
    }

    const cInstance = Context.resolve(C);

    cInstance.b.a.hello();
    cInstance.b.hello();
    cInstance.hello();

    /*
      A
      B
      C
      C
    */
```

### Improve

 - [ ] Add more unit tests
 - [ ] Improve code documentation
