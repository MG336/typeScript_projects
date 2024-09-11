import { describe, it, expect } from "vitest";
import * as variables from '../src/projects/typing_of_variables';

describe('Testing exported variables', ()=> {
    it('should have the correct userName', ()=> {
        expect(variables.userName).toBe("Alice");
    })

    it('should have the correct age', ()=> {
        expect(variables.age).toBe(25);
    })

    it('should have the correct id', () => {
        expect(variables.id).toBe("abc123");
    });

    it('should have the correct array of numbers', () => {
        expect(variables.number).toEqual([1, 2, 3, 4, 5]);
    });

    it('should have the correct array of numbers and strings', () => {
        expect(variables.numberOrString).toEqual([1, 2, 3, 'a', 'b', 'c']);
    });
})
