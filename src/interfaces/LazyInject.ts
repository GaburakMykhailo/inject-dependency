/**
 * @private
 */
export interface LazyInject {
  promise: Promise<any>
  resolve: () => {}
}
