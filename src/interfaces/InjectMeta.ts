/**
 * @private
 */
export interface InjectMeta {
  dependencies: Array<Function>
  lazyDependencies: Map<
    string,
    {
      clsOrAlias: any
      callback: Function
    }
  >
}
