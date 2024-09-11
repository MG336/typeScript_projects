import { Animal, Dog } from '../src/projects/classes';
import { describe, it, expect, vi } from 'vitest';

describe('Animal and Dog classes', () => {
    it('should log the correct message for Animal', () => {
        const logSpy = vi.spyOn(console, 'log');
        const animal = new Animal("Generic Animal");

        animal.speak();
        expect(logSpy).toHaveBeenCalledWith('Generic Animal makes a noise');
        logSpy.mockRestore();
    })

    it('should log the correct message for Dog', () => {
        const logSpy = vi.spyOn(console, 'log');
        const dog = new Dog("Rex");

        dog.speak();


        expect(logSpy).toHaveBeenCalledWith('Rex barks.');

        logSpy.mockRestore();
    });

})