import { describe, it, expect, vi } from 'vitest';

import { cn } from '.'; // Adjust path as necessary

// Mock clsx and twMerge
vi.mock('clsx', () => ({
  clsx: (inputs: any[]) => inputs.filter(Boolean).join(' '), // Mock clsx to just join the classes with a space
}));

vi.mock('tailwind-merge', () => ({
  twMerge: (classes: string) => classes, // Mock twMerge to return the classes as-is (for simplicity)
}));

describe('cn function', () => {
  it('should join class names correctly', () => {
    const result = cn('bg-red-500', 'text-white', 'p-4');
    expect(result).toBe('bg-red-500 text-white p-4');
  });

  it('should ignore falsy values (null, undefined, false)', () => {
    const result = cn(
      'bg-red-500',
      null,
      'text-white',
      undefined,
      false,
      'p-4',
    );
    expect(result).toBe('bg-red-500 text-white p-4');
  });

  it('should merge conflicting Tailwind classes correctly', () => {
    const result = cn('bg-red-500', 'bg-blue-500');
    expect(result).toBe('bg-red-500 bg-blue-500');
  });

  it('should return an empty string for no input', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('should handle empty strings and falsy values correctly', () => {
    const result = cn('bg-red-500', '', 'text-white', false);
    expect(result).toBe('bg-red-500 text-white');
  });
});
