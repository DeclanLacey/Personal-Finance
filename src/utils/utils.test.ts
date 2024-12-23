// @vitest-environment jsdom
import {describe, it, expect, beforeEach, vi} from 'vitest'
import { alertToWindow, calculatePercentOfTotal, capitalizeEachWord, checkIfStringIsNumber, currencyFormatCents, currencyFormatNoCents, filterTransactions, filterTransactionsBySearch, formatDate, getOrdinalSuffix, renderColorOptions, sortAToZ, sortByLatestDate, sortByOldestDate, sortInAscendingOrderByAbsoluteValue, sortInDescendingOrderByAbsoluteValue, sortZToA } from './utils';
import data from "../data/data.json"
import { Transaction } from '../types/types';

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
});

describe('getOrdinalSuffix()', () => {
    it('should return the number passed in plus st if the remainder if j is equal to 1 and k is not equal to 11', () => {
        const input = 1;
        const expectedOutput = "1st";
        const result = getOrdinalSuffix(input);
        expect(result).toBe(expectedOutput);
    });

    it('should return the number passed in plus nd if the remainder if j is equal to 2 and k is not equal to 12', () => {
        const input = 2;
        const expectedOutput = "2nd";
        const result = getOrdinalSuffix(input);
        expect(result).toBe(expectedOutput);
    });

    it('should return the number passed in plus rd if the remainder if j is equal to 3 and k is not equal to 13', () => {
        const input = 3;
        const expectedOutput = "3rd";
        const result = getOrdinalSuffix(input);
        expect(result).toBe(expectedOutput);
    });

    it('should return the number passed in plus th if no other statements are true', () => {
        const input = 5;
        const expectedOutput = "5th";
        const result = getOrdinalSuffix(input);
        expect(result).toBe(expectedOutput);
    });
});

describe('capitalizeEachWord()', () => {
    it('should return the same string with every word capitalized', () => {
        const input = 'this is a string';
        const expectedOutput = 'This Is A String';
        const result = capitalizeEachWord(input);
        expect(result).toBe(expectedOutput);
    });
});

describe('renderColorOptions()', () => {
    it('should return an HTMLElementCollection', () => {
        const mockData = [
            { 
                name: "green", 
                hex: "#277C78",
                id: "string",
                createdAt: "string",
                updatedAt: "string"
            },
        ];

        const result = renderColorOptions(mockData);
        expect(result).toBeInstanceOf(Array);
        expect(result[0].type).toBe('option');
    });
});

// describe('sortTransactions()', () => {
    
// })

describe('sorting util functions', () => {
    let mockTransactionData : Transaction[];

    beforeEach(() => {
        mockTransactionData = [
            {
                avatar: "./assets/avatars/dining-out.jpg",
                name: "Savory Bites Bistro",
                category: "Dining Out",
                date: "08/19/2024",
                amount: -55.50,
                recurring: false,
                createdAt: "string",
                id: "string",
                profileOwner: "string",
                updatedAt: "string"
            },
            {
                avatar: "./assets/avatars/personal-care.jpg",
                name: "Serenity Spa & Wellness",
                category: "Personal Care",
                date: "08/03/2024",
                amount: -30.00,
                recurring: true,
                createdAt: "string",
                id: "string",
                profileOwner: "string",
                updatedAt: "string"
            },
            {
                avatar: "./assets/avatars/general.jpg",
                name: "Buzz Marketing Group",
                category: "General",
                date: "07/26/2024",
                amount: 3358.00,
                recurring: false,
                createdAt: "string",
                id: "string",
                profileOwner: "string",
                updatedAt: "string"
            }
        ]
    });


    describe('sortByLatestDate()', () => {
        it('should return an array of transactions sorted by the latest date first', () => {
            let result = sortByLatestDate(mockTransactionData);
            expect(Number(new Date(result[0].date))).toBeGreaterThanOrEqual(Number(new Date(result[result.length - 1].date)));
        });

        it('should return an empty array if no transactions are provided', () => {
            let result = sortByLatestDate([]);
            expect(result).toEqual([]);
        });
    })

    describe('sortByOldestDate()', () => {
        it('should return an array of transactions sorted by the oldest date first', () => {
            let result = sortByOldestDate(mockTransactionData);
            expect(Number(new Date(result[0].date))).toBeLessThanOrEqual(Number(new Date(result[result.length - 1].date)));
        });

        it('should return an empty array if no transactions are provided', () => {
            let result = sortByOldestDate([]);
            expect(result).toEqual([]);
        });
    });

    describe('sortAToZ()', () => {
        it('should return an array of transactions sorted from A to Z by their name', () => {
            let result = sortAToZ(mockTransactionData);
            expect(result[0].name.localeCompare(result[result.length -1].name)).toBe(-1)
        });

        it('should return an empty array if no transactions are provided', () => {
            let result = sortAToZ([]);
            expect(result).toEqual([]);
        });
    });

    describe('sortZToA()', () => {
        it('should return an array of transactions sorted from Z to A by their name', () => {
            let result = sortZToA(mockTransactionData);
            expect(result[0].name.localeCompare(result[result.length -1].name)).toBe(1)
        });

        it('should return an empty array if no transactions are provided', () => {
            let result = sortZToA([]);
            expect(result).toEqual([]);
        });
    });
    
    describe('sortInDescendingOrderByAbsoluteValue()', () => {
        it('should return an array sorted in descending order by the absolute value of the amount', () => {
            let result = sortInDescendingOrderByAbsoluteValue(mockTransactionData);
            expect(Math.abs(result[0].amount)).toBeGreaterThanOrEqual(Math.abs(result[result.length - 1].amount));
        });

        it('should return an empty array if no transactions are provided', () => {
            let result = sortInDescendingOrderByAbsoluteValue([]);
            expect(result).toEqual([]);
        });
    });

    describe('sortInAscendingOrderByAbsoluteValue()', () => {
        it('should return an array sorted in ascending order by the absolute value of the amount', () => {
            let result = sortInAscendingOrderByAbsoluteValue(mockTransactionData);
            expect(Math.abs(result[0].amount)).toBeLessThanOrEqual(Math.abs(result[result.length - 1].amount));
        });

        it('should return an empty array if no transactions are provided', () => {
            let result = sortInAscendingOrderByAbsoluteValue([]);
            expect(result).toEqual([]);
        });
    });
})

describe('filter functions for transactions', () => {
    let mockTransactionData : Transaction[];
    
    beforeEach(() => {
        mockTransactionData = [
            {
                avatar: "./assets/avatars/dining-out.jpg",
                name: "Savory Bites Bistro",
                category: "Dining Out",
                date: "08/19/2024",
                amount: -55.50,
                recurring: false,
                createdAt: "string",
                id: "string",
                profileOwner: "string",
                updatedAt: "string"
            },
            {
                avatar: "./assets/avatars/personal-care.jpg",
                name: "Serenity Spa & Wellness",
                category: "Personal Care",
                date: "08/03/2024",
                amount: -30.00,
                recurring: true,
                createdAt: "string",
                id: "string",
                profileOwner: "string",
                updatedAt: "string"
            },
            {
                avatar: "./assets/avatars/general.jpg",
                name: "Buzz Marketing Group",
                category: "General",
                date: "07/26/2024",
                amount: 3358.00,
                recurring: false,
                createdAt: "string",
                id: "string",
                profileOwner: "string",
                updatedAt: "string"
            }
        ]
    });

    describe('filterTransactions()', () => {
        it('should return the same transactions if no filterSelection is provided', () => {
            let result = filterTransactions("", mockTransactionData);
            expect(result).toBe(mockTransactionData);
        });

        it('should return only transactions with the category passed in as the filter', () => {
            let result = filterTransactions('general', mockTransactionData);
            expect(result[0].category).toBe('General');
        });

        it('should return no transactions if there are no matches to the category passed in as the filter', () => {
            let result = filterTransactions('shopping', mockTransactionData);
            expect(result.length).toBe(0);
        });
    });

    describe('filterTransactionsBySearch()', () => {
        it('should return the same transactions if a string of only spaces are passed in', () => {
            let result = filterTransactionsBySearch('   ', mockTransactionData);
            expect(result).toMatchObject(mockTransactionData);
        });

        it('should return the same transactions if an empty string is passed in', () => {
            let result = filterTransactionsBySearch('', mockTransactionData);
            expect(result).toMatchObject(mockTransactionData);
        });

        it('should return only transactions whos name contains the search input', () => {
            let result = filterTransactionsBySearch('savory', mockTransactionData);
            expect(result).toMatchObject([mockTransactionData[0]]);
        });

        it('should return only transactions whos name contains the search input regardless of extra spaces', () => {
            let result = filterTransactionsBySearch('  savory  ', mockTransactionData);
            expect(result).toMatchObject([mockTransactionData[0]]);
        });
    });

});





