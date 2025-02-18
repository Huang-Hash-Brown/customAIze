import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';

export type UseBooleanReturn = {
  value: boolean; // The current boolean state value

  setValue: Dispatch<SetStateAction<boolean>>; // The function to directly set the boolean state

  setTrue: () => void; // Function to set the state to `true`

  setFalse: () => void; // Function to set the state to `false`

  toggle: () => void; // Function to toggle the state between `true` and `false`
};

/**
 * Custom hook to manage a boolean state with utility functions for easy manipulation.
 *
 * This hook provides a simple way to manage a boolean state with additional functions
 * to set the state to `true`, `false`, or toggle it. It also offers a method to directly
 * set the state using `setValue`.
 *
 * @param {boolean} [defaultValue=false] - The initial value for the boolean state.
 *                                         If no value is provided, it defaults to `false`.
 * @returns {UseBooleanReturn} An object containing:
 * - `value`: The current boolean state value.
 * - `setValue`: The function to directly update the boolean state.
 * - `setTrue`: A function to set the state to `true`.
 * - `setFalse`: A function to set the state to `false`.
 * - `toggle`: A function to toggle the current state between `true` and `false`.
 *
 * @throws {Error} Will throw an error if `defaultValue` is not a boolean value.
 *
 * @example
 * ```tsx
 * const { value, setTrue, setFalse, toggle } = useBoolean(true);
 *
 * // Usage
 * console.log(value);  // true
 * setFalse();          // value is now false
 * toggle();            // value is now true
 * ```
 */
export const useBoolean = (defaultValue: boolean): UseBooleanReturn => {
  if (typeof defaultValue !== 'boolean') {
    throw new Error('defaultValue must be `true` or `false`');
  }

  const [value, setValue] = useState(defaultValue);

  const setTrue = () => setValue(true);

  const setFalse = () => setValue(false);

  const toggle = () => setValue((x) => !x);

  return {
    value,
    setValue,
    setTrue,
    setFalse,
    toggle,
  };
};

export default useBoolean;
