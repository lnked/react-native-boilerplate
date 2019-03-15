import { usePrevious } from './usePrevious'

export function useOnUpdate(fn, value) {
  const prevValue = usePrevious(value)
  fn(prevValue)
}
