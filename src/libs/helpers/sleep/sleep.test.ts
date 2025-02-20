import { describe, it, expect, vi, afterEach } from 'vitest';

import { sleep } from '.';

describe('sleep function', () => {
  // Mock the global setTimeout to avoid real delays during tests
  vi.useFakeTimers();

  it('should resolve after the specified delay', async () => {
    const delay = 1000; // 1 second
    const sleepPromise = sleep(delay);

    // Fast-forward time by the delay (in ms)
    vi.advanceTimersByTime(delay);

    // Wait for the promise to resolve
    await expect(sleepPromise).resolves.toBeUndefined();
  });

  it('should resolve immediately if the delay is 0', async () => {
    const delay = 0;
    const sleepPromise = sleep(delay);

    // Wait for the promise to resolve
    await expect(sleepPromise).resolves.toBeUndefined();
  });

  it('should handle negative delay (resolves immediately)', async () => {
    const delay = -1000; // Negative delay
    const sleepPromise = sleep(delay);

    // Fast-forward time by a negative delay (resolves immediately)
    await expect(sleepPromise).resolves.toBeUndefined();
  });

  // Cleanup timers after tests
  afterEach(() => {
    vi.useRealTimers();
  });
});
