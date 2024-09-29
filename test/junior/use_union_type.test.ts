import processId from '../../src/projects/junior/use_union_type';
import { describe, it, expect, vi } from "vitest";


describe('processId function', ()=> {

    it('should multiply the number by 2 when a number is passed', ()=> {
        const logSpy = vi.spyOn(console, 'log');
        processId(5);
        expect(logSpy).toHaveBeenCalledWith(10);
        logSpy.mockRestore();
    })

    it('should convert the string to uppercase when a string is passed', ()=>{
        const logSpy = vi.spyOn(console, 'log');
        processId('abc');
        expect(logSpy).toHaveBeenCalledWith('ABC');
        logSpy.mockRestore();
    })

})