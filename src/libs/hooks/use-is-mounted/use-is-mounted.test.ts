import { act, renderHook } from '@testing-library/react-hooks';
import { describe, it, expect } from 'vitest';

import { useIsMounted } from '.';

// Helper to flush all promises (required for async useEffect behavior)
const flushPromises = () => new Promise(setImmediate);

describe('useIsMounted', () => {
  it('should return isMounted as true after the hook mounts', async () => {
    const { result } = renderHook(() => useIsMounted({}));

    // Use act() and wait for all promises to resolve
    await act(async () => {
      await flushPromises(); // Flush any pending promises from useEffect
    });

    // Check if isMounted is true after the hook mounts
    expect(result.current.isMounted).toBe(true);
  });

  it('should return isMountedAsync promise resolving to true after mount', async () => {
    const { result } = renderHook(() => useIsMounted({}));

    // Use act() and wait for all promises to resolve
    await act(async () => {
      await flushPromises(); // Flush any pending promises
    });

    // Wait for the promise to resolve and check the value
    const resolvedState = await result.current.isMountedAsync;
    expect(resolvedState).toBe(true);
  });

  it('should respect the initialState prop', () => {
    const { result } = renderHook(() => useIsMounted({ initialState: true }));

    // Check if initialState is respected and isMounted is initially true
    expect(result.current.isMounted).toBe(true);
  });
});
