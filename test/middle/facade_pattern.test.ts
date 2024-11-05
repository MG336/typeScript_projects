import { ApiFacade } from "../../src/projects/middle/facade_pattern";
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('ApiFacade', () => {
    global.fetch = vi.fn();
    const baseUrl = 'https://api.example.com';
    const apiFacade = new ApiFacade(baseUrl);
    const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
    const mockProducts = [{ id: 1, title: 'Product 1', price: 100 }];

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should successfully fetch user data and their products', async () => {

        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
            json: async () => Promise.resolve(mockUser),
        } as Response);

        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
            json: async () => Promise.resolve(mockProducts),
        } as Response);

        const result = await apiFacade.fetchUsers();

        expect(result).toEqual({
            user: mockUser,
            userProducts: mockProducts
        });
    });

    it('should throw an error if unable to fetch user', async () => {
        vi.mocked(fetch).mockResolvedValueOnce({
            ok: false,
            statusText: 'Not Found'
        } as Response);

        await expect(apiFacade.fetchUsers()).rejects.toThrowError();
    });

    it('should throw an error if unable to fetch products', async () => {

        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
            json: async () => Promise.resolve(mockUser),
        } as Response);

        vi.mocked(fetch).mockResolvedValueOnce({
            ok: false,
            statusText: 'Not Found'
        } as Response);

        await expect(apiFacade.fetchUsers()).rejects.toThrowError();
    });
});