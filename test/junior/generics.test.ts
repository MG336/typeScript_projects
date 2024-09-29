import identity from '../../src/projects/junior/generics';
import { describe, it, expect, vi } from 'vitest';


describe('function identity',()=>{
    it('should return same string',()=>{
        // const logSpy = vi.spyOn(console,'log');
        const result = identity<string>('abc')
        expect(result).toBe('abc');
    });
    it('should return the same array',()=>{
        const obj = {name: 'Alice'};
        const result = identity<{name: string}>(obj);
        expect(result).toBe(obj);
    })
    it('should return the same array', () => {
        const arr = [1, 2, 3];
        const result = identity<number[]>(arr);
        expect(result).toBe(arr); 
      });
})