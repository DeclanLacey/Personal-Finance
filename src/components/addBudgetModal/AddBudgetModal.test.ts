import {describe, it, expect, beforeEach, vi} from 'vitest'
import { getData } from './AddBudgetModal';
import { getThemes } from '../../utils/clientCalls';
import * as clientCalls from "../../utils/clientCalls"



describe('getData', () => {
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
        getThemes = vi.fn(() => {return mockThemes})

        await getData(setLoading, setThemes, getThemes);

        expect(setLoading).toHaveBeenCalledWith(true);
        expect(setThemes).toHaveBeenCalledWith(mockThemes);
        expect(setLoading).toHaveBeenCalledWith(false);
    })

    it('should throw an error when getThemes fails', async () => {
        getThemes = vi.fn(() => {return PromiseRejectionEvent})
        const getDataFn = async () => await getData(setLoading, setThemes, getThemes)
        
        await expect(getDataFn).rejects.toThrow(/There has been an error while getting the data. Error message ->/i);
    })
})

