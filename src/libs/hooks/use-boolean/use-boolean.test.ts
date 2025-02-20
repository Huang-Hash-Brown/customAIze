import { renderHook, act } from '@testing-library/react-hooks';
import { describe, it, expect } from 'vitest';

import { useBoolean } from '.';

describe('useBoolean hook', () => {
  it('should initialize with the correct default value', () => {
    const { result } = renderHook(() => useBoolean(true));
    expect(result.current.value).toBe(true);

    const { result: resultFalse } = renderHook(() => useBoolean(false));
    expect(resultFalse.current.value).toBe(false);
  });

  it('should throw an error if the default value is not a boolean', () => {
    const { result } = renderHook(() => useBoolean('not-a-boolean' as any));

    // Expect the hook to throw an error
    expect(() => result.current).toThrow(
      'defaultValue must be `true` or `false`',
    );
  });

  it('should set value to true when setTrue is called', () => {
    const { result } = renderHook(() => useBoolean(false));

    act(() => {
      result.current.setTrue();
    });

    expect(result.current.value).toBe(true);
  });

  it('should set value to false when setFalse is called', () => {
    const { result } = renderHook(() => useBoolean(true));

    act(() => {
      result.current.setFalse();
    });

    expect(result.current.value).toBe(false);
  });

  it('should toggle value between true and false when toggle is called', () => {
    const { result } = renderHook(() => useBoolean(true));

    // First toggle, should set it to false
    act(() => {
      result.current.toggle();
    });

    expect(result.current.value).toBe(false);

    // Second toggle, should set it back to true
    act(() => {
      result.current.toggle();
    });

    expect(result.current.value).toBe(true);
  });
});
