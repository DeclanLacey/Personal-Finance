// @vitest-environment jsdom
import {describe, it, expect, beforeEach, vi} from 'vitest'
import { alertToWindow, calculatePercentOfTotal, checkIfStringIsNumber, currencyFormatCents, currencyFormatNoCents, formatDate } from './utils';

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

describe('calculatePercentOfTotal()', () => {
    it('should return what percent num is of total', () => {
        const total = 100;
        const num = 20;
        const expectedPercent = 20;
        const result = calculatePercentOfTotal(total, num);
        expect(result).toBe(expectedPercent);
    });

    it('should return 100 if the percent is higher than 100', () => {
        const total = 100;
        const num = 3120;
        const expectedPercent = 100;
        const result = calculatePercentOfTotal(total, num);
        expect(result).toBe(expectedPercent);
    });
})

describe('formatDate()', () => {
    it('should return a date formatted as 02 Jul 2024', () => {
        const dateInput = "12/21/2024";
        const expectedOutput = "21 Dec 2024";
        const result = formatDate(dateInput);
        expect(result).toBe(expectedOutput);
    });

    it('should throw an error when passed a string not able to be parsed to a date', () => {
        const dateInput = "random string";
        const result = () => formatDate(dateInput);
        expect(result).toThrow(/invalid date string/i);
    });
})

