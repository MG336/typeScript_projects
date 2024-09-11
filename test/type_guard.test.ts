import processInput from '../src/projects/type_guard';
import { describe, it, expect, vi } from "vitest";

describe('processInput function', ()=> {
    it('should convert the string to uppercase when a string is passed', ()=> {
        const logSpy = vi.spyOn(console,'log');
        processInput('abc');
        expect(logSpy).toHaveBeenCalledWith('ABC')
        logSpy.mockRestore;
    })

    it('should log the correct name and age when an object is passed', ()=> {
        const logSpy = vi.spyOn(console,'log');
        processInput({ name: "Alice", age: 30 });
        expect(logSpy).toHaveBeenCalledWith('Name: Alice, Age: 30');
        logSpy.mockRestore();
    })

})