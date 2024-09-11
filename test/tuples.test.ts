import { describe, it, expect, vi } from 'vitest';
import showProductInfo from '../src/projects/tuples';

describe('showProductInfo function', () => {
    it('should log the correct product information', ()=> {
        const logSpy = vi.spyOn(console, 'log');
        const product: [string, number, boolean] = ["Laptop", 1500, true];
        showProductInfo(product);
        expect(logSpy).toHaveBeenCalledWith('Product: Laptop, Price: $1500, In Stock: true');
        logSpy.mockRestore();
    })
})