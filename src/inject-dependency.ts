// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import 'core-js/es6/map'

// decorators
import injectable from './decorators/injectable'
import dependencies from './decorators/dependencies'
import fabrica from './decorators/fabrica'
import lazyInject from './decorators/lazyInject'
import singleton from './decorators/singleton'

// classes
import Context from './classes/context'

export { injectable, dependencies, Context, fabrica, lazyInject, singleton }
