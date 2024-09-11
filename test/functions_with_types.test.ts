import add from '../src/projects/functions_with_types';
import { describe, it, expect, vi } from 'vitest';

describe('function add',()=>{
    it('should return sum',()=>{
        const result = add(2,2)
        expect(result).toBe(4);
    });
})

