// @vitest-environment jsdom
import {describe, it, expect, beforeEach, vi} from 'vitest'
import { alertToWindow, checkIfStringIsNumber, currencyFormatCents, currencyFormatNoCents } from './utils';

describe('checkIfStringIsNumber()', () => {
    it('should return true if whole number string is passed in', () => {
        const dataOne = "5";
        const result = checkIfStringIsNumber(dataOne);
        expect(result).toBe(true);
    });

    it('should return true if a decimal number string is passed in', () => {
        const data = "5.00";
        const result = checkIfStringIsNumber(data);
        expect(result).toBe(true);
    });

    it('should return false if a non number string is passed in', () => {
        const data = "5.2wdf";
        const result = checkIfStringIsNumber(data);
        expect(result).toBe(false);
    });
})

describe('currencyFormatCents()', () => {
    it('should return a string in the format of $5.00', () => {
        const data = 5.34;
        const formattedData = "$5.34";
        const result = currencyFormatCents(data);
        expect(result).toBe(formattedData);
    });

    it('should return a string in the format of -$5.00', () => {
        const data = -5;
        const formattedData = "-$5.00";
        const result = currencyFormatCents(data);
        expect(result).toBe(formattedData);
    });
})

describe('currencyFormatNoCents', () => {
  it('should return a string in the format of $5', () => {
    const data = 5.34;
    const formattedData = "$5";
    const result = currencyFormatNoCents(data);
    expect(result).toBe(formattedData);
  });

  it('should return a string in the format of -$5', () => {
    const data = -45.56;
    const formattedData = "-$46";
    const result = currencyFormatNoCents(data);
    expect(result).toBe(formattedData);
  });
})

