/**
 * A utility function to delay execution for a specified amount of time.
 * This function returns a promise that resolves after the given time in milliseconds.
 *
 * @param {number} ms - The number of milliseconds to sleep.
 * @returns {Promise<void>} - A promise that resolves after the specified time has passed.
 *
 * @example
 * ```ts
 * async function example() {
 *   console.log("Start");
 *   await sleep(2000); // Sleep for 2 seconds
 *   console.log("End after 2 seconds");
 * }
 * ```
 */
export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export default sleep;
