import getAdultUsers from '../../src/projects/junior/arrays_with_interfaces';
import { describe, it, expect, vi } from 'vitest';

describe('getAdultUsers', () => {
    it('should return the names of users older than 18', () => {
        const users = [
            { name: "Alice", age: 25 },
            { name: "Bob", age: 17 },
            { name: "Charlie", age: 22 }
        ];

        const result = getAdultUsers(users);
        expect(result).toEqual(["Alice", "Charlie"]);
      });


    it('should return an empty array if no users are older than 18', () => {
    const underageUsers = [
        { name: "Tim", age: 16 },
        { name: "Lucy", age: 17 }
    ];
    const result = getAdultUsers(underageUsers);
    expect(result).toEqual([]);
    });
})
    
    
