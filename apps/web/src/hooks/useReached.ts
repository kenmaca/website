/** Native: scroll position isn't tracked, so nothing is ever considered reached. */
export function useReached(_id: string, _fraction?: number): boolean {
  return false;
}
