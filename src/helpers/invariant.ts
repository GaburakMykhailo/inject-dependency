/**
 *
 * @private
 */
export default function invariant(state: boolean, errorMessage: string) {
  if (state) {
    throw new Error(errorMessage)
  }
}
