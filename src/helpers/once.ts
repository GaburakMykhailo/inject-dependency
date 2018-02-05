/**
 * @private
 * @param f function that will be called once and after each calling return first result
 */
export default function once<F extends Function>(f: F): F {
  let result: any
  let executed = false

  return (((...args: any[]): any => {
    if (executed) {
      return result
    }

    executed = true
    result = f(...args)

    return result
  }) as any) as F
}
