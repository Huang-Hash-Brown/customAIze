import { useEffect, useState } from 'react';
export interface UseIsMountedProps {
  /**
   * The initial state of the mounted state
   * @default false
   */
  initialState?: boolean;
}

export interface UseIsMountedReturn {
  /**
   * The mounted state
   */
  isMounted: boolean;
  /**
   * A promise of the mounted state
   */
  isMountedAsync: Promise<boolean>;
}

/**
 * Custom hook to check if the component is mounted
 * @param {UseIsMountedProps} props - Optional initial state for `isMounted`
 * @returns {UseIsMountedReturn} - Returns an object containing:
 * - `isMounted`: A boolean indicating if the component is mounted.
 * - `isMountedAsync`: A promise resolving to the mounted state.
 *
 * @example
 * ```tsx
 * const { isMounted, isMountedAsync } = useIsMounted();
 *
 * useEffect(() => {
 *   if (isMounted) {
 *     // Component is mounted, safe to perform side effects
 *     console.log("Component is mounted");
 *   }
 * }, [isMounted]);
 *
 * useEffect(() => {
 *   isMountedAsync.then((mounted) => {
 *     if (mounted) {
 *       // Do something after the component is mounted
 *     }
 *   });
 * }, [isMountedAsync]);
 * ```
 */
export const useIsMounted = ({
  initialState,
}: UseIsMountedProps): UseIsMountedReturn => {
  const [isMounted, setIsMounted] = useState(initialState ?? false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return {
    isMounted,
    isMountedAsync: Promise.resolve(isMounted),
  };
};
