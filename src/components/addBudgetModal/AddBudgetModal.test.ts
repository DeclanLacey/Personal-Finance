// @vitest-environment jsdom
import {describe, it, expect, beforeEach, vi} from 'vitest'
import { getData, handleSubmit } from './AddBudgetModal';
import { SyntheticEvent } from 'react';


describe('getData()', () => {
    let setLoading: Function;
    let setThemes: Function;
    let getThemes: Function;

    beforeEach(() => {
        setLoading = vi.fn();
        setThemes = vi.fn();
    })

    it('should call setLoading and setThemes with the correct data when receiving data from getThemes', async () => {
        const mockThemes = {
            name: "name",
            hex: "#FFFFFF",
            id: "id",
            createdAt: "date",
            updatedAt: "date"
        };
        getThemes = vi.fn(() => {return mockThemes});

        await getData(setLoading, setThemes, getThemes);

        expect(setLoading).toHaveBeenCalledWith(true);
        expect(setThemes).toHaveBeenCalledWith(mockThemes);
        expect(setLoading).toHaveBeenCalledWith(false);
    })

    it('should throw an error when getThemes fails', async () => {
        getThemes = vi.fn(() => {return PromiseRejectionEvent;});
        const getDataFn = async () => await getData(setLoading, setThemes, getThemes);
        
        await expect(getDataFn).rejects.toThrow(/There has been an error while getting the data. Error message ->/i);
    });

})

describe('handleSubmit()', () => {
    const preventDefault = vi.fn();
    let setShowAddBudgetModal = vi.fn()

    let mockData = {
        category: "test",
        maximum: "test",
        theme: "test"
    }
    let mockBudgets = [
        {
            category: "string",
            createdAt: "string",
            id: "string",
            maximum: 5,
            profileOwner: "string",
            theme: "string",
            updatedAt: "string"
        }
    ]

    const syntheticEvent: Partial<SyntheticEvent> = {
        preventDefault,
    };

    it("should call prevent default on event", () => {
        handleSubmit(syntheticEvent as SyntheticEvent, mockBudgets, mockData.category, mockData.maximum, mockData.theme, setShowAddBudgetModal)
        expect(preventDefault).toHaveBeenCalled()
    }) 

})

