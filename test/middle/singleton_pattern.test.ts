import {DatabaseConnection} from '../../src/projects/middle/singleton_pattern'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe("DatabaseConnection",()=>{
    let db1;
    beforeEach(()=>{
        DatabaseConnection.instance = null;
        db1 = DatabaseConnection.getInstance();
        vi.spyOn(console, 'log').mockImplementation(()=>{});
    })
    afterEach(()=>{
        vi.resetAllMocks();
    })
    it('should establish a connection',()=>{
        db1.connect();
        expect(console.log).toHaveBeenCalledWith("Connection is set");
    })

    it('should inform that the connection is already established on subsequent connection attempts',()=>{

        db1 = DatabaseConnection.getInstance();
        db1.connect();
        db1.connect();
        expect(console.log).toHaveBeenCalledWith("Connection is already set");
    })

    it('should disconnect the connection', ()=>{
        db1.connect();
        db1.disconnect();
        expect(console.log).toHaveBeenCalledWith("Connection is disabled");
    })

    it('should inform that the connection is already disabled',()=>{
        db1.disconnect();
        expect(console.log).toHaveBeenCalledWith("Connection is already disabled");
    })

})
