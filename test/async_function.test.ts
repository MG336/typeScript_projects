import fetchData from '../src/projects/async_function';
import { describe, it, expect, vi } from 'vitest';

describe('fetchData function', () => {
    it('should log data on successful fetch', async () => {

        const mockData = { id: 1, title: "Test todo" };

        global.fetch = vi.fn(() =>
            Promise.resolve({ json: () => Promise.resolve(mockData), } as Response)
        );


        const logSpy = vi.spyOn(console, 'log');


        await fetchData("https://jsonplaceholder.typicode.com/todos/1");


        expect(logSpy).toHaveBeenCalledWith(mockData);


        logSpy.mockRestore();
    });

    it('should log an error message on fetch failure', async () => {

        global.fetch = vi.fn(() =>
            Promise.reject(new Error("Network error"))
        );


        const errorSpy = vi.spyOn(console, 'error');


        await fetchData("https://jsonplaceholder.typicode.com/todos/1");


        expect(errorSpy).toHaveBeenCalledWith("Error fetching data:", expect.any(Error));


        errorSpy.mockRestore();
    });
})