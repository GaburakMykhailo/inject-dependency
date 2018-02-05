
# Library for DI with global container underhood 
This library was inpired by AngularJS


---
## Typescript Example:
```typescript
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
