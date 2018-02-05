/**
 * @private
 */
export default function classToFunction<F extends Function>(cls: F): () => F {
  return ((...args: any[]): any => {
    return new (cls as any)(...args)
  }) as any
}
