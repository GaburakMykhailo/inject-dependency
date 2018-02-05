/**
 * @private
 */
export default function classToFunction<F extends Function>(cls: F): () => F {
  return function(...args: any[]): any {
    return new (cls as any)(...args)
  } as any
}
